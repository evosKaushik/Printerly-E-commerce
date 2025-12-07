// src/components/SidebarPortal.jsx
import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const SidebarPortal = ({ isOpen, onClose, children }) => {
  const [portalRoot, setPortalRoot] = useState(null);
  const [visible, setVisible] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const animationRef = useRef(null);


  useEffect(() => {
    let sidebarRoot = document.getElementById("sidebar-root");
    if (!sidebarRoot) {
      sidebarRoot = document.createElement("div");
      sidebarRoot.id = "sidebar-root";
      document.body.appendChild(sidebarRoot);
    }
    setPortalRoot(sidebarRoot);
  }, []);


  useEffect(() => {
    if (isOpen) setVisible(true); 
  }, [isOpen]);

  // ✅ Handle animations after mount
  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (isOpen && visible) {
      // OPEN animation
      animationRef.current = gsap.timeline();
      animationRef.current.fromTo(
        sidebarRef.current,
        { x: 300 },
        { x: 0, duration: 0.4, ease: "power3.out" }
      );
      animationRef.current.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power1.out" },
        "<"
      );
    } else if (!isOpen && visible) {
      // CLOSE animation
      animationRef.current = gsap.timeline({
        onComplete: () => setVisible(false), // unmount after animation ends
      });
      animationRef.current
        .to(sidebarRef.current, {
          x: 300,
          duration: 0.3,
          ease: "power3.in",
        })
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power1.inOut",
          },
          "<"
        );
    }
  }, [isOpen, visible]);

  if (!portalRoot || !visible) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm cursor-pointer opacity-0"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="relative bg-background dark:bg-gray-900 w-64 sm:w-72 h-full border-l border-gray-700 shadow-xl translate-x-[300px]"
      >
        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default SidebarPortal;
