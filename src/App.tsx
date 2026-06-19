import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Mail,
  Phone,
  Linkedin,
  Building2,
  Factory,
  Calendar,
  Award,
  FileText,
  TrendingUp,
  GraduationCap,
  Briefcase,
  MapPin,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Plane,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatBot } from "@/components/ChatBot";

// Lightbox Component
function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: {
  images: { src: string; title: string; description?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const isPdf = currentImage.src.endsWith(".pdf");

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-white/10 rounded-full">
          <span className="text-white font-mono text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl max-h-[90vh] w-full mx-4 flex flex-col items-center">
        {isPdf ? (
          <iframe
            src={currentImage.src}
            className="w-full h-[80vh] rounded-lg"
            title={currentImage.title}
          />
        ) : (
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        )}

        {/* Caption */}
        <div className="mt-4 text-center">
          <h3 className="text-xl text-white font-medium">
            {currentImage.title}
          </h3>
          {currentImage.description && (
            <p className="text-[#94A3B8] mt-1">{currentImage.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, -rect.top / window.innerHeight),
        );
        setScrollY(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="section-container relative flex items-center justify-center"
      style={{ height: "150vh" }}
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 100}px) scale(${1 + scrollY * 0.1})`,
          opacity: 1 - scrollY * 0.8,
        }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Dubai Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/40 to-[#0F172A]" />
      </div>

      {/* Animated Grid Overlay */}
      <div
        className="absolute inset-0 blueprint-grid z-[1] opacity-30"
        style={{ opacity: 0.3 - scrollY * 0.3 }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-4 max-w-6xl mx-auto -mt-40"
        style={{
          transform: `translateY(${-scrollY * 150}px)`,
          opacity: 1 - scrollY,
        }}
      >
        {/* Name with Elegant Serif Font */}
        <h1 className="font-hero text-[12vw] md:text-[9vw] font-medium tracking-[0.05em] text-white mb-2 leading-none">
          <span className="gold-gradient-text">Sarthak</span>
        </h1>
        <h1 className="font-hero text-[12vw] md:text-[9vw] font-medium tracking-[0.05em] text-white mb-8 leading-none">
          <span className="gold-gradient-text">Kalsotra</span>
        </h1>

        {/* Subtitle */}
        <p className="font-mono text-lg md:text-xl tracking-[0.4em] text-[#94A3B8] mb-4">
          PLANNING & DESIGN ENGINEER
        </p>

        {/* <p className="font-mono text-sm tracking-[0.2em] text-[#D4A056] mb-12">
          PRIMAVERA P6 SPECIALIST
        </p> */}

        {/* Tagline */}
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-16 font-light">
          Building Tomorrow's Infrastructure with Precision, Planning &
          Excellence
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            className="bg-[#D4A056] hover:bg-[#E8C880] text-[#0F172A] px-8 py-6 text-lg font-medium tracking-wider transition-all duration-300 hover:scale-105"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            VIEW PROJECTS
          </Button>
          <Button
            variant="outline"
            className="border-[#D4A056] text-[#D4A056] hover:bg-[#D4A056]/10 px-8 py-6 text-lg font-medium tracking-wider transition-all duration-300"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            GET IN TOUCH
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: 1 - scrollY * 2 }}
      >
        <span className="text-xs font-mono text-[#94A3B8] tracking-widest">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown className="w-6 h-6 text-[#D4A056] animate-bounce" />
      </div>
    </section>
  );
}

// Profile Section Component
function ProfileSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "M.Tech", label: "Highway Engg." },
    { value: "B.Tech", label: "Civil Engg." },
    { value: "4+", label: "UAE Projects" },
  ];

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="section-container bg-[#0F172A] blueprint-grid py-12 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Illustration */}
          <div
            className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="relative">
              {/* Engineer SVG Illustration */}
              <svg
                viewBox="0 0 400 500"
                className="w-full max-w-md mx-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Hard Hat */}
                <path
                  d="M200 80C150 80 110 110 100 150H300C290 110 250 80 200 80Z"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "0.2s" }}
                />
                <path
                  d="M90 150H310V170H90V150Z"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "0.4s" }}
                />
                {/* Face Outline */}
                <path
                  d="M140 170V220C140 280 160 320 200 320C240 320 260 280 260 220V170"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "0.6s" }}
                />
                {/* Eyes */}
                <circle
                  cx="170"
                  cy="230"
                  r="8"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "0.8s" }}
                />
                <circle
                  cx="230"
                  cy="230"
                  r="8"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "0.9s" }}
                />
                {/* Nose */}
                <path
                  d="M200 240L195 270H205L200 240Z"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "1s" }}
                />
                {/* Mouth */}
                <path
                  d="M180 290Q200 305 220 290"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "1.1s" }}
                />
                {/* Neck */}
                <path
                  d="M170 320V360H230V320"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "1.2s" }}
                />
                {/* Shoulders */}
                <path
                  d="M100 360H300"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "1.3s" }}
                />
                <path
                  d="M100 360V450M300 360V450"
                  stroke="#D4A056"
                  strokeWidth="2"
                  fill="none"
                  className={isVisible ? "animate-draw-line" : ""}
                  style={{ animationDelay: "1.4s" }}
                />
                {/* Blueprint Lines Decoration */}
                <line
                  x1="50"
                  y1="400"
                  x2="100"
                  y2="400"
                  stroke="#D4A056"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
                <line
                  x1="300"
                  y1="400"
                  x2="350"
                  y2="400"
                  stroke="#D4A056"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
                <line
                  x1="50"
                  y1="420"
                  x2="80"
                  y2="420"
                  stroke="#D4A056"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
                <line
                  x1="320"
                  y1="420"
                  x2="350"
                  y2="420"
                  stroke="#D4A056"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
              </svg>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#D4A056]/30 rounded-full animate-pulse-gold" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-[#D4A056]/20 rounded-full" />
            </div>
          </div>

          {/* Right - Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-[#D4A056] to-transparent" />
              <span className="font-mono text-sm tracking-[0.3em] text-[#D4A056]">
                PROFILE
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
              Engineering Excellence
              <br />
              <span className="gold-gradient-text">Built on Integrity</span>
            </h2>

            <p className="text-lg text-[#94A3B8] leading-relaxed mb-6">
              Planning and Design-focused Civil Engineer with strong expertise
              in Primavera P6 scheduling, baseline development, resource
              allocation, and infrastructure design. Possessing 2+ years of
              experience in project controls, billing, and contract management.
            </p>

            <p className="text-lg text-[#94A3B8] leading-relaxed mb-6">
              Completed{" "}
              <span className="text-[#D4A056]">
                M.Tech in Highway Engineering
              </span>{" "}
              (Working Professional Program) from Thapar University (2024-2026),
              while working as Civil Engineer at SRM Contractors Limited.
            </p>

            <p className="text-lg text-[#94A3B8] leading-relaxed mb-12">
              4+ years of freelance support for{" "}
              <span className="text-[#D4A056]">
                UAE-based construction projects
              </span>
              , experienced in Civil 3D road design, structural analysis using
              STAAD Pro, and preparation of technical documentation aligned with
              Middle East standards.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center p-4 glass-card rounded-lg transition-all duration-500 hover:scale-105 hover:border-[#D4A056]/50`}
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-bold gold-gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#94A3B8] font-mono tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Certificates Section Component
function CertificatesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const certificates = [
    {
      title: "Primavera P6 Professional",
      issuer: "PTS CAD EXPERT",
      date: "June 2024",
      skills: ["Scheduling", "Resource Loading", "WBS", "Baseline Development"],
      icon: Calendar,
      image: "/cert-primavera.pdf",
      thumbnail: "/cert-primavera-thumb.png",
    },
    {
      title: "Autodesk Civil 3D",
      issuer: "PTS CAD EXPERT",
      date: "June 2024",
      skills: [
        "Road Design",
        "Corridor Modeling",
        "Earthwork",
        "Profile Design",
      ],
      icon: TrendingUp,
      image: "/cert-civil3d.pdf",
      thumbnail: "/cert-civil3d-thumb.png",
    },
    {
      title: "Advanced AutoCAD",
      issuer: "PTS CAD EXPERT",
      date: "June 2024",
      skills: ["2D Drafting", "3D Modeling", "Parametric Design", "Sheet Sets"],
      icon: FileText,
      image: "/cert-autocad.pdf",
      thumbnail: "/cert-autocad-thumb.png",
    },
    {
      title: "STAAD Pro Structural Analysis",
      issuer: "Professional Certification",
      date: "Certified",
      skills: [
        "Structural Modeling",
        "Load Analysis",
        "Design Codes",
        "Foundation Design",
      ],
      icon: Building2,
      image: "/steel-truss.png",
      thumbnail: "/steel-truss.png",
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentCertIndex(index);
    setLightboxOpen(true);
  };

  const nextCert = () => {
    setCurrentCertIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = () => {
    setCurrentCertIndex(
      (prev) => (prev - 1 + certificates.length) % certificates.length,
    );
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="section-container bg-[#0F172A] py-12 md:py-32 relative overflow-hidden"
    >
      {/* Lightbox */}
      <Lightbox
        images={certificates.map((c) => ({
          src: c.image,
          title: c.title,
          description: `${c.issuer} • ${c.date}`,
        }))}
        currentIndex={currentCertIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextCert}
        onPrev={prevCert}
      />

      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[18vw] font-bold text-[#1E293B]/25 select-none">
          CERTIFIED
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="font-mono text-sm tracking-[0.3em] text-[#D4A056] mb-4 block">
            CREDENTIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Professional{" "}
            <span className="gold-gradient-text">Certifications</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Industry-recognized certifications demonstrating expertise in
            project planning and design software
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert.title}
              onClick={() => openLightbox(index)}
              className={`certificate-card p-0 overflow-hidden cursor-pointer group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cert.thumbnail}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-[#D4A056] flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-[#0F172A]" />
                  </div>
                </div>

                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-[#D4A056]/20 backdrop-blur-sm flex items-center justify-center">
                  <cert.icon className="w-5 h-5 text-[#D4A056]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-base font-medium text-white mb-1 group-hover:gold-gradient-text transition-all">
                  {cert.title}
                </h3>

                {/* Issuer & Date */}
                <p className="text-xs font-mono text-[#D4A056] mb-3">
                  {cert.issuer} • {cert.date}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-[#D4A056]/10 rounded text-xs text-[#94A3B8]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4A056]/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Click hint */}
        <p
          className={`text-center text-sm text-[#64748B] mt-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Click on any certificate to view full details
        </p>
      </div>
    </section>
  );
}

// Expertise Section Component
function ExpertiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const expertise = [
    {
      icon: Calendar,
      title: "PROJECT PLANNING",
      tools: "Primavera P6, MS Project",
      description:
        "Baseline schedules, WBS development, resource loading, progress monitoring, S-curves, and recovery schedules.",
    },
    {
      icon: TrendingUp,
      title: "ROAD & HIGHWAY DESIGN",
      tools: "Civil 3D, Corridor Modeling",
      description:
        "Road alignment, profile and cross-section design, earthwork calculations, and quantity takeoffs.",
    },
    {
      icon: Building2,
      title: "STRUCTURAL DESIGN",
      tools: "STAAD.Pro, Foundation Design",
      description:
        "Structural modeling, load analysis, foundation and retaining wall design, design validation.",
    },
    {
      icon: FileText,
      title: "PROJECT CONTROLS",
      tools: "Billing, Contracts, Quantity Take Off",
      description:
        "DPR/MPR preparation, BOQ reconciliation, IPC and stage payments, variation analysis.",
    },
    {
      icon: FileCheck,
      title: "GOVERNMENT TENDER MANAGEMENT",
      tools: "Tender Documentation, Bid Capacity Analysis, Cost Estimation",
      description:
        "Preparation of technical and financial tenders, bid capacity evaluation, and pre-tender cost estimation.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="section-container bg-gradient-to-b from-[#0F172A] to-[#1E293B] py-12 md:py-32 relative overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20vw] font-bold text-[#1E293B]/30 select-none">
          EXPERTISE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="font-mono text-sm tracking-[0.3em] text-[#D4A056] mb-4 block">
            CAPABILITIES
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Technical <span className="gold-gradient-text">Expertise</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Comprehensive skill set covering project planning, design, and
            controls for infrastructure projects
          </p>
        </div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {expertise.map((item, index) => (
            <div
              key={item.title}
              className={`group glass-card p-8 rounded-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#D4A056]/50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-[#D4A056]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4A056]/20 transition-colors">
                <item.icon className="w-7 h-7 text-[#D4A056]" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-white mb-2 tracking-wider">
                {item.title}
              </h3>

              {/* Tools */}
              <p className="text-sm font-mono text-[#D4A056] mb-4">
                {item.tools}
              </p>

              {/* Description */}
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {item.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#D4A056]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Software Skills */}
        <div
          className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h3 className="text-center text-xl text-white mb-8 font-light">
            Software Proficiency
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Primavera P6",
              "Civil 3D",
              "STAAD.Pro",
              "AutoCAD",
              "MS Excel",
            ].map((skill, index) => (
              <span
                key={skill}
                className="px-6 py-3 glass-card rounded-full text-sm text-[#94A3B8] font-mono tracking-wider hover:border-[#D4A056]/50 hover:text-[#D4A056] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Technical Work Section Component
function TechnicalWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const techWorks = [
    {
      title: "STAAD Pro Analysis",
      description:
        "G+4 Building structural analysis with seismic and wind load considerations",
      image: "/building-modelling.png",
    },
    {
      title: "Foundation Design",
      description: "Isolated foundation design with load distribution analysis",
      image: "/foundation-design.png",
    },
    {
      title: "Steel Truss Modeling",
      description: "Industrial steel structure with truss roof design",
      image: "/steel-truss.png",
    },
    {
      title: "Reinforcement Detailing",
      description: "RCC structural elements reinforcement design and detailing",
      image: "/reinforcement-design.png",
    },
    {
      title: "Civil 3D Road Profile",
      description:
        "Highway alignment and profile design with earthwork calculations",
      image: "/civil3d-profile.png",
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % techWorks.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + techWorks.length) % techWorks.length,
    );
  };

  return (
    <section
      ref={sectionRef}
      id="technical-work"
      className="section-container bg-[#0F172A] py-12 md:py-32"
    >
      {/* Lightbox */}
      <Lightbox
        images={techWorks.map((w) => ({
          src: w.image,
          title: w.title,
          description: w.description,
        }))}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="font-mono text-sm tracking-[0.3em] text-[#D4A056] mb-4 block">
            PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Technical <span className="gold-gradient-text">Work Samples</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Showcase of design and analysis work using industry-standard
            engineering software
          </p>
        </div>

        {/* Work Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techWorks.map((work, index) => (
            <div
              key={work.title}
              onClick={() => openLightbox(index)}
              className={`tech-work-card group cursor-pointer transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent opacity-80" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:gold-gradient-text transition-all">
                    {work.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8]">{work.description}</p>
                </div>

                {/* Zoom Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-[#D4A056] flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-[#0F172A]" />
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-[#D4A056]/0 group-hover:border-[#D4A056]/50 transition-all duration-300 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Click hint */}
        <p
          className={`text-center text-sm text-[#64748B] mt-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Click on any image to view in full size
        </p>
      </div>
    </section>
  );
}

// Quantity Surveying Section Component
function QuantitySurveyingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const qsItems = [
    {
      title: "Automated Quantity Sheets",
      description:
        "Self-prepared automated Excel sheets for efficient quantity calculation across various work items",
      image: "/qs-automated-sheets.pdf",
      thumbnail: "/qs-automated-sheets-thumb.png",
      type: "pdf",
    },
    {
      title: "Quantities Precast",
      description:
        "Precast concrete quantities calculation and tracking spreadsheet",
      image: "/qs-quantities-precast.xlsx",
      thumbnail: "/qs-quantities-precast-thumb.png",
      type: "xlsx",
    },
  ];

  const handleItemClick = (index: number, item: (typeof qsItems)[0]) => {
    if (item.type === "xlsx") {
      window.open(item.image, "_blank");
    } else {
      setCurrentItemIndex(index);
      setLightboxOpen(true);
    }
  };

  const nextItem = () => {
    setCurrentItemIndex((prev) => (prev + 1) % qsItems.length);
  };

  const prevItem = () => {
    setCurrentItemIndex((prev) => (prev - 1 + qsItems.length) % qsItems.length);
  };

  return (
    <section
      ref={sectionRef}
      id="quantity-surveying"
      className="section-container bg-gradient-to-b from-[#0F172A] to-[#1E293B] py-12 md:py-32 relative overflow-hidden"
    >
      {/* Lightbox */}
      <Lightbox
        images={qsItems.map((item) => ({
          src: item.image,
          title: item.title,
          description: item.description,
        }))}
        currentIndex={currentItemIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextItem}
        onPrev={prevItem}
      />

      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[18vw] font-bold text-[#1E293B]/20 select-none">
          QS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="font-mono text-sm tracking-[0.3em] text-[#D4A056] mb-4 block">
            EXPERTISE
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Quantity <span className="gold-gradient-text">Surveying</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Professional quantity estimation, billing, and cost management for
            construction projects
          </p>
        </div>

        {/* QS Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {qsItems.map((item, index) => (
            <div
              key={item.title}
              onClick={() => handleItemClick(index, item)}
              className={`certificate-card p-0 overflow-hidden cursor-pointer group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative h-56 overflow-hidden">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1E293B] flex items-center justify-center">
                    {item.type === "xlsx" ? (
                      <FileSpreadsheet className="w-20 h-20 text-[#D4A056]/60" />
                    ) : (
                      <FileText className="w-20 h-20 text-[#D4A056]/60" />
                    )}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-[#D4A056] flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-[#0F172A]" />
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#D4A056]/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-mono text-[#D4A056] uppercase">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-2 group-hover:gold-gradient-text transition-all">
                  {item.title}
                </h3>
                <p className="text-sm text-[#94A3B8]">{item.description}</p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4A056]/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Skills Tags */}
        <div
          className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h3 className="text-center text-xl text-white mb-8 font-light">
            QS Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "BOQ Preparation",
              "Quantity Takeoff",
              "Rate Analysis",
              "Cost Estimation",
              "Billing",
              "Contract Management",
              "Excel",
            ].map((skill, index) => (
              <span
                key={skill}
                className="px-6 py-3 glass-card rounded-full text-sm text-[#94A3B8] font-mono tracking-wider hover:border-[#D4A056]/50 hover:text-[#D4A056] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <p
          className={`text-center text-sm text-[#64748B] mt-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Click on any item to view details
        </p>
      </div>
    </section>
  );
}

// Project Planning & Controls Section
function PlanningSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const planningItems = [
    {
      title: "Nashik Work Programme",
      description:
        "Detailed project work programme for Nashik infrastructure project including activity sequencing, duration planning, and milestone tracking using Primavera P6 methodology.",
      file: "/nashik-work-programme.pdf",
      thumb: "/nashik-ss.png",
      type: "pdf",
      category: "schedule",
    },
    {
      title: "Work Programme & Resource Mobilisation Plan",
      description:
        "Comprehensive work programme with resource mobilisation strategy covering manpower, equipment, and material deployment planning for timely project execution.",
      file: "/work-programme-resource-mobilisation.pdf",
      thumb: "/thumb-work-programme-resource.png",
      type: "pdf",
      category: "schedule",
    },
    {
      title: "Work Programme — Feb 2026",
      description:
        "Project work programme update with revised scheduling, activity duration adjustments, and progress tracking for ongoing construction activities.",
      file: "/work-programme-feb2026.pdf",
      thumb: "/thumb-work-programme-feb2026.png",
      type: "pdf",
      category: "schedule",
    },
    {
      title: "Project Planning & CPM Methodology Report",
      description:
        "Detailed report on Critical Path Method (CPM) methodology applied to project planning, covering network diagram development, float analysis, and critical path identification.",
      file: "/project-planning-cpm.pdf",
      thumb: "/thumb-project-planning-cpm.png",
      type: "pdf",
      category: "schedule",
    },
    {
      title: "4m Height RRM Wall Design",
      description:
        "Structural design and analysis of a 4-meter-high Reinforced Rockfill Masonry (RRM) retaining wall, covering wall geometry, reinforcement detailing, stability checks, and material specifications.",
      file: "/rrm-wall-4m-design.pdf",
      thumb: "/thumb-rrm-wall-4m-design.png",
      type: "pdf",
      category: "design",
    },
    {
      title: "RRM Wall Design — General",
      description:
        "General design documentation for Reinforced Rockfill Masonry (RRM) walls including design methodology, cross-section details, load calculations, and construction notes for site implementation.",
      file: "/rrm-wall-design.pdf",
      thumb: "/thumb-rrm-wall-design.png",
      type: "pdf",
      category: "design",
    },
  ];

  // const currentItem = planningItems[currentItemIndex];

  const openItem = (index: number) => {
    setCurrentItemIndex(index);
    setLightboxOpen(true);
  };

  const nextItem = () => {
    setCurrentItemIndex((prev) => (prev + 1) % planningItems.length);
  };

  const prevItem = () => {
    setCurrentItemIndex(
      (prev) => (prev - 1 + planningItems.length) % planningItems.length,
    );
  };

  return (
    <section
      ref={sectionRef}
      id="planning"
      className="section-container bg-[#1E293B] py-12 md:py-32 relative overflow-hidden"
    >
      {/* Lightbox */}
      <Lightbox
        images={planningItems.map((item) => ({
          src: item.file,
          title: item.title,
          description: item.description,
        }))}
        currentIndex={currentItemIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={nextItem}
        onPrev={prevItem}
      />

      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[18vw] font-bold text-[#1E293B]/20 select-none">
          PLAN
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="font-mono text-sm tracking-[0.3em] text-[#D4A056] mb-4 block">
            PROJECT CONTROLS &amp; DESIGN
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Planning, Scheduling{" "}
            <span className="gold-gradient-text">&amp; Design</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Primavera P6 work programmes, resource mobilisation plans, and
            structural design documentation demonstrating integrated project
            planning and design expertise
          </p>
        </div>

        {/* Planning Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {planningItems.map((item, index) => (
            <div
              key={item.title}
              onClick={() => openItem(index)}
              className={`certificate-card p-0 overflow-hidden cursor-pointer group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-[#D4A056] flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-[#0F172A]" />
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#D4A056]/20 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-mono text-[#D4A056] uppercase">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-2 group-hover:gold-gradient-text transition-all">
                  {item.title}
                </h3>
                <p className="text-sm text-[#94A3B8]">{item.description}</p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4A056]/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Click hint */}
        <p
          className={`text-center text-sm text-[#64748B] mt-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Click on any item to view the full document
        </p>
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "KETURAH RESORT",
      location: "Dubai Healthcare City, UAE",
      description:
        "Preparation and approval of Bill of Quantities (BOQ) for RCC works and architectural works for Keturah Resort at Dubai Healthcare City. Coordinated with contractor CECEP and obtained approvals from Dubai Healthcare City (DHC) authority.",
      image: "/project-keturah.jpg",
      stats: [
        { label: "Client", value: "Dubai Healthcare City" },
        { label: "Contractor", value: "CECEP" },
        { label: "Role", value: "Quantity Surveyor" },
      ],
      highlights: [
        "BOQ preparation for RCC works",
        "Architectural works quantification",
        "DHC authority approval",
        "Contractor coordination",
      ],
    },
    {
      id: 2,
      title: "ZAYED AIRPORT TERMINAL",
      location: "Abu Dhabi, UAE",
      description:
        "Construction of East Midfield Cargo Terminal (EMCT) Facility at Zayed International Airport. 7,000 sqm of modular partition wall systems installed in 42 days using CPM methodology with Primavera P6 scheduling.",
      image: "/project-airport.jpg",
      stats: [
        { label: "Duration", value: "42 Days" },
        { label: "Area", value: "7,000 m²" },
        { label: "Client", value: "Abu Dhabi Airports" },
      ],
      highlights: [
        "Fast-track parallel zone execution",
        "Primavera P6 scheduling",
        "ADOSH compliance",
        "Quality control per ITP",
      ],
    },
    {
      id: 3,
      title: "HIGHWAY INFRASTRUCTURE",
      location: "Jammu, India",
      description:
        "Street Development and Highway Construction including NW3 Apsara Road High Street Gole Market Area with adjoining roads. Complete EPC contract execution with progress monitoring.",
      image: "/project-highway.jpg",
      stats: [
        { label: "Type", value: "Highway" },
        { label: "Role", value: "Site Engineer" },
        { label: "Company", value: "Hassan Road Constr." },
      ],
      highlights: [
        "EPC contract management",
        "Street development",
        "Material procurement",
        "Quality assurance",
      ],
    },
    {
      id: 4,
      title: "INDUSTRIAL COMPLEXES",
      location: "Kathua, India",
      description:
        "Construction of industrial buildings for Jammu Pigments Ltd in partnership with GM Projects. Manufacturing facility for Lead Metal and Alloy production.",
      image: "/project-industrial.jpg",
      stats: [
        { label: "Type", value: "Industrial" },
        { label: "Role", value: "Construction" },
        { label: "Partner", value: "GM Projects" },
      ],
      highlights: [
        "Industrial building design",
        "Structural coordination",
        "Safety compliance",
        "Production facility setup",
      ],
    },
  ];

  const currentProject = projects[activeProject];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-container bg-gradient-to-b from-[#1E293B] to-[#0F172A] py-12 md:py-32"
    >
      {/* Lightbox for Project Images */}
      <Lightbox
        images={[
          {
            src: currentProject.image,
            title: currentProject.title,
            description: currentProject.location,
          },
        ]}
        currentIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => {}}
        onPrev={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="font-mono text-sm tracking-[0.3em] text-[#D4A056] mb-4 block">
            FEATURED
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Key <span className="gold-gradient-text">Projects</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Landmark infrastructure projects demonstrating technical excellence
            and project management capabilities
          </p>
        </div>

        {/* Project Navigation */}
        <div
          className={`flex justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`px-6 py-3 rounded-lg font-mono text-sm tracking-wider transition-all duration-300 ${
                activeProject === index
                  ? "bg-[#D4A056] text-[#0F172A]"
                  : "glass-card text-[#94A3B8] hover:text-white"
              }`}
            >
              {project.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Active Project Display */}
        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${activeProject === index ? "block" : "hidden"}`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image with Click to View */}
                <div
                  className="relative perspective-1000 cursor-pointer group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <div className="relative group preserve-3d transition-transform duration-500 hover:rotate-y-2">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

                      {/* Zoom Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-[#D4A056] flex items-center justify-center">
                          <ZoomIn className="w-7 h-7 text-[#0F172A]" />
                        </div>
                      </div>
                    </div>

                    {/* Decorative Frame */}
                    <div className="absolute -inset-4 border border-[#D4A056]/30 rounded-lg -z-10" />
                    <div className="absolute -inset-8 border border-[#D4A056]/10 rounded-lg -z-20" />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#D4A056]" />
                    <span className="font-mono text-[#D4A056] tracking-wider">
                      {project.location}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
                    {project.title}
                  </h3>

                  <p className="text-lg text-[#94A3B8] leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {project.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-4 glass-card rounded-lg"
                      >
                        <div className="text-lg font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-[#94A3B8] font-mono">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-sm font-mono text-[#D4A056] tracking-wider mb-4">
                      PROJECT HIGHLIGHTS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-4 py-2 bg-[#D4A056]/10 border border-[#D4A056]/30 rounded-full text-sm text-[#94A3B8]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Timeline Section Component
function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      year: "2025 - Present",
      title: "RAQ",
      role: "Planning Consultant",
      location: "Zayed International Airport, Remote",
      description:
        "Working as a freelance planning consultant supporting Abu Dhabi Airports projects, assisting with coordination, analysis, scheduling and remote planning.",
      icon: Plane,
      current: true,
    },
    {
      year: "2023 - Present",
      title: "SRM CONTRACTORS LIMITED",
      role: "Civil Engineer – Planning & Design",
      location: "India",
      description:
        "Preparation of Baseline Schedules and monitoring site progress. DPR/MPR with physical & financial tracking. Design analysis, drawing review, quantity calculations, BOQ reconciliation, IPC preparation, and variation evaluation.",
      icon: Briefcase,
      current: true,
    },

    {
      year: "2024 - 2026",
      title: "THAPAR UNIVERSITY",
      role: "M.Tech Highway Engineering",
      location: "Working Professional Program",
      description:
        "Completed Master of Technology in Highway Engineering (2024-2026) through working professional program, with focus on advanced road design and infrastructure planning.",
      icon: GraduationCap,
      current: false,
    },
    {
      year: "2023",
      title: "JAMMU PIGMENTS LTD",
      role: "Associate, Self Employed",
      location: "Kathua, Jammu & Kashmir",
      description:
        "Construction of industrial buildings in partnership with GM Projects. Manufacturing facility for Lead Metal, Lead Ingots, and Lead Alloys.",
      icon: Factory,
    },
    {
      year: "2022",
      title: "HASSAN ROAD CONSTRUCTION",
      role: "Site Engineer",
      location: "Gandhi Nagar, Jammu",
      description:
        "EPC contract for Street Development including NW3 Apsara Road High Street Gole Market Area with adjoining roads.",
      icon: Building2,
    },
    {
      year: "2020",
      title: "SHRI MATA VAISHNO DEVI UNIVERSITY",
      role: "B.Tech Civil Engineering",
      location: "Jammu & Kashmir",
      description:
        "Completed Bachelor of Technology in Civil Engineering with comprehensive training in structural design and construction management.",
      icon: Award,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-container bg-[#0F172A] py-12 md:py-32 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="font-mono text-sm tracking-[0.3em] text-[#D4A056] mb-4 block">
            JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Professional <span className="gold-gradient-text">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Spine */}
          <div className="timeline-spine hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className={`relative md:grid md:grid-cols-2 md:gap-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Node (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${exp.current ? "bg-[#D4A056] animate-pulse-gold" : "bg-[#0F172A] border-2 border-[#D4A056]"}`}
                  >
                    <exp.icon
                      className={`w-5 h-5 ${exp.current ? "text-[#0F172A]" : "text-[#D4A056]"}`}
                    />
                  </div>
                </div>

                {/* Content - Alternating sides */}
                <div
                  className={`${index % 2 === 0 ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"}`}
                >
                  <div
                    className={`glass-card p-6 md:p-8 rounded-lg hover:border-[#D4A056]/50 transition-all duration-300 group ${exp.current ? "border-[#D4A056]/40" : ""}`}
                  >
                    {/* Year Badge */}
                    <div
                      className={`inline-flex items-center gap-2 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-mono ${exp.current ? "bg-[#D4A056] text-[#0F172A]" : "bg-[#D4A056]/20 text-[#D4A056]"}`}
                      >
                        {exp.year}
                      </span>
                      {exp.current && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          CURRENT
                        </span>
                      )}
                      <exp.icon className="w-4 h-4 text-[#D4A056] md:hidden" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium text-white mb-2 group-hover:gold-gradient-text transition-all">
                      {exp.title}
                    </h3>

                    {/* Role */}
                    <p className="text-sm font-mono text-[#D4A056] mb-2">
                      {exp.role}
                    </p>

                    {/* Location */}
                    <p className="text-xs text-[#64748B] mb-4">
                      {exp.location}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-container relative py-12 md:py-32 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#D4A056]/20 via-[#0F172A] to-[#0F172A]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4A056]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4A056]/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="font-hero text-4xl md:text-6xl font-medium text-white mb-6">
            Let's Build the <span className="gold-gradient-text">Future</span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            Ready to contribute to landmark projects in the UAE. Let's discuss
            how I can bring value to your team with my expertise in planning and
            design.
          </p>
        </div>

        {/* Contact Cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {/* Email */}
          <a
            href="mailto:kalsotrasarthak@gmail.com"
            className="glass-card p-6 rounded-lg text-center group hover:border-[#D4A056]/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D4A056]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4A056]/20 transition-colors">
              <Mail className="w-6 h-6 text-[#D4A056]" />
            </div>
            <h3 className="text-sm font-mono text-[#94A3B8] mb-2">EMAIL</h3>
            <p className="text-white text-sm">kalsotrasarthak@gmail.com</p>
          </a>

          {/* Phone */}
          <a
            href="tel:+918493838655"
            className="glass-card p-6 rounded-lg text-center group hover:border-[#D4A056]/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D4A056]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4A056]/20 transition-colors">
              <Phone className="w-6 h-6 text-[#D4A056]" />
            </div>
            <h3 className="text-sm font-mono text-[#94A3B8] mb-2">PHONE</h3>
            <p className="text-white text-sm">+91 84938 38655</p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sarthak-kalsotra-381b04390?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 rounded-lg text-center group hover:border-[#D4A056]/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D4A056]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4A056]/20 transition-colors">
              <Linkedin className="w-6 h-6 text-[#D4A056]" />
            </div>
            <h3 className="text-sm font-mono text-[#94A3B8] mb-2">LINKEDIN</h3>
            <p className="text-white text-sm">Sarthak Kalsotra</p>
          </a>
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[#94A3B8] mb-6">Based in India</p>
          <Button
            className="bg-[#D4A056] hover:bg-[#E8C880] text-[#0F172A] px-10 py-6 text-lg font-medium tracking-wider transition-all duration-300 hover:scale-105"
            onClick={() =>
              window.open("mailto:kalsotrasarthak@gmail.com", "_blank")
            }
          >
            START A CONVERSATION
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#64748B]">
              © 2026 Sarthak Kalsotra. All rights reserved.
            </p>
            <p className="text-sm text-[#64748B]">Planning & Design Engineer</p>
          </div>
        </div>
      </footer>
    </section>
  );
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Profile", href: "#profile" },
    { label: "Certificates", href: "#certificates" },
    { label: "Expertise", href: "#expertise" },
    { label: "Technical Work", href: "#technical-work" },
    { label: "Quantity Surveying", href: "#quantity-surveying" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0F172A]/90 backdrop-blur-lg border-b border-[#D4A056]/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="font-hero text-2xl font-medium tracking-wider text-white hover:gold-gradient-text transition-all"
            >
              SK
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-sm font-mono tracking-wider text-[#94A3B8] hover:text-[#D4A056] transition-colors"
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0F172A]/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="font-hero text-2xl font-medium tracking-wider text-white hover:gold-gradient-text transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navigation />
      <main>
        <HeroSection />
        <ProfileSection />
        <CertificatesSection />
        <ExpertiseSection />
        <TechnicalWorkSection />
        <QuantitySurveyingSection />
        <PlanningSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <ChatBot />
    </div>
  );
}

export default App;
