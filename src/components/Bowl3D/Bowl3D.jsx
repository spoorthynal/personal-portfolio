import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import styles from "./Bowl3D.module.css";

const MODEL_URL = "/acai_bowl.glb";

// node name -> ingredient id, for parts that desaturate/recolor on toggle.
const NODE_INGREDIENT = {
  Object_2: "acai",
  Object_4: "granola",
  Object_5: "strawberry",
  Object_6: "strawberry",
  Object_7: "banana",
  Object_8: "blueberry",
};

// The granola mesh has whitish flecks that read as coconut shavings, and
// there's no separate coconut geometry — so clicking granola also reveals
// coconut/LinkedIn. Granola is picked last so it stays the active panel.
const DUAL_REVEAL = { granola: "coconut" };

// Banana's texture renders too pale/cream — multiply-tint it more yellow.
// Açaí base gets pushed toward a deep purple-magenta.
const COLOR_TINT = { "Material.006": "#f5e8b2", Material: "#855091" };

// Clones a material and injects a uSaturation uniform that desaturates the
// sampled texture toward greyscale; animated in useFrame per ingredient.
function makeDesaturatable(material) {
  const clone = material.clone();
  const uniform = { value: 0 };
  clone.onBeforeCompile = (shader) => {
    shader.uniforms.uSaturation = uniform;
    shader.fragmentShader =
      "uniform float uSaturation;\n" +
      shader.fragmentShader.replace(
        "#include <map_fragment>",
        `#include <map_fragment>
         {
           float gray = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
           diffuseColor.rgb = mix(vec3(gray), diffuseColor.rgb, uSaturation);
         }`
      );
  };
  clone.userData.uSaturation = uniform;
  clone.needsUpdate = true;
  return clone;
}

function Model({ isOn, pick, active, hovered, setHovered, cursorTarget, isDragging, scrollRef }) {
  const { nodes } = useGLTF(MODEL_URL);
  const rootGroupRef = useRef(null);

  const ingredientMaterials = useMemo(() => {
    const byMaterialName = {};
    const result = {};
    for (const nodeName of Object.keys(NODE_INGREDIENT)) {
      const node = nodes[nodeName];
      if (!node) continue;
      const matName = node.material.name;
      if (!byMaterialName[matName]) {
        const mat = makeDesaturatable(node.material);
        if (COLOR_TINT[matName]) mat.color.set(COLOR_TINT[matName]);
        byMaterialName[matName] = mat;
      }
      result[nodeName] = byMaterialName[matName];
    }
    return result;
  }, [nodes]);

  // Clone each node (not just its geometry) so we keep the node's own
  // position/rotation/scale — that's what places each topping on the rim
  // instead of collapsing everything to local origin.
  const ingredientNodes = useMemo(() => {
    const result = {};
    for (const nodeName of Object.keys(NODE_INGREDIENT)) {
      const node = nodes[nodeName];
      if (!node) continue;
      const cloned = node.clone();
      cloned.material = ingredientMaterials[nodeName];
      result[nodeName] = cloned;
    }
    return result;
  }, [nodes, ingredientMaterials]);

  const groupRefs = useRef({});

  useFrame((_, delta) => {
    for (const [nodeName, id] of Object.entries(NODE_INGREDIENT)) {
      const mat = ingredientMaterials[nodeName];
      const uniform = mat?.userData.uSaturation;
      if (!uniform) continue;
      const target = isOn(id) ? 1 : 0;
      uniform.value += (target - uniform.value) * Math.min(delta * 6, 1);
    }

    for (const [nodeName, id] of Object.entries(NODE_INGREDIENT)) {
      const group = groupRefs.current[nodeName];
      if (!group) continue;
      const targetScale = active === id || hovered === id ? 1.05 : 1;
      group.scale.x += (targetScale - group.scale.x) * Math.min(delta * 10, 1);
      group.scale.y = group.scale.z = group.scale.x;
    }

    // Spin + tumble tied to page scroll, eased toward its target each frame
    // so it glides instead of jumping. Y keeps turning continuously; X/Z nod
    // and roll on a sine so it reads as a 3D tumble rather than a flat spin.
    if (rootGroupRef.current) {
      const s = scrollRef.current;
      const targetY = Math.PI + s * 0.004;
      const targetX = Math.sin(s * 0.0035) * 0.28;
      const targetZ = Math.sin(s * 0.002) * 0.14;
      const rot = rootGroupRef.current.rotation;
      const ease = Math.min(delta * 3, 1);
      rot.y += (targetY - rot.y) * ease;
      rot.x += (targetX - rot.x) * ease;
      rot.z += (targetZ - rot.z) * ease;
    }
  });

  if (!nodes.Object_2) return null;

  return (
    <group ref={rootGroupRef} rotation={[0, Math.PI, 0]}>
      {/* bowl vessel — structural, not clickable */}
      <primitive object={nodes.Object_3} />

      {Object.entries(NODE_INGREDIENT).map(([nodeName, id]) => (
        <group key={nodeName} ref={(el) => (groupRefs.current[nodeName] = el)}>
          <primitive
            object={ingredientNodes[nodeName]}
            onClick={(e) => {
              e.stopPropagation();
              const also = DUAL_REVEAL[id];
              if (also) pick(also);
              pick(id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(id);
              if (!isDragging.current && cursorTarget.current) {
                cursorTarget.current.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              setHovered(null);
              if (!isDragging.current && cursorTarget.current) {
                cursorTarget.current.style.cursor = "grab";
              }
            }}
          />
        </group>
      ))}
    </group>
  );
}

export default function Bowl3D({ isOn, pick, active }) {
  const [hovered, setHovered] = useState(null);
  const wrapRef = useRef(null);
  const isDragging = useRef(false);
  const scrollRef = useRef(window.scrollY);

  useEffect(() => {
    const stopDrag = () => {
      isDragging.current = false;
      if (wrapRef.current) wrapRef.current.style.cursor = "grab";
    };
    window.addEventListener("pointerup", stopDrag);
    return () => window.removeEventListener("pointerup", stopDrag);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={styles.canvasWrap}
      onPointerDown={() => {
        isDragging.current = true;
        if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
      }}
    >
      <Canvas camera={{ position: [0, 3.4, 4.2], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 5, 2]} intensity={1.6} />
        <directionalLight position={[-3, 2, -2]} intensity={0.5} />
        <Suspense fallback={null}>
          <Model
            isOn={isOn}
            pick={pick}
            active={active}
            hovered={hovered}
            setHovered={setHovered}
            cursorTarget={wrapRef}
            isDragging={isDragging}
            scrollRef={scrollRef}
          />
          <Environment preset="apartment" />
        </Suspense>
        <OrbitControls enablePan enableZoom minDistance={3} maxDistance={12} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
