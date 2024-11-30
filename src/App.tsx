// App.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Navbar } from "./components/navbar";
import { HeartPulse, BrainCircuit, Users, Quote } from "lucide-react";

// Animation variants
const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Top Doctors Section */}
      <TopDoctorsSection />

      {/* Specialties Section */}
      <SpecialtiesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// HeroSection Component
function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 px-10 overflow-hidden bg-[#F7F3ED] lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 bg-[#F7F3ED]" />
      <motion.div
        className="w-full px-4 mx-auto relative z-10"
        initial="initial"
        animate="animate"
        variants={animations.stagger}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            variants={animations.fadeIn}
            className="w-full lg:w-1/2 space-y-8 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              No Long Waits, Appointments at your{" "}
              <span className="text-[#4169E1] relative">
                fingertips
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#4169E1]/20" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Experience comprehensive healthcare with our expert team.
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <Button className="bg-[#4169E1] hover:bg-[#4169E1]/90 text-white px-8 py-4 rounded-full text-lg">
                Book an Appointment
              </Button>
            </div>
          </motion.div>
          <motion.div variants={animations.fadeIn} className="w-full lg:w-1/2">
            <img
              src="/hero.png"
              alt="Doctor"
              className="w-full h-auto mx-auto lg:mx-0"
            />
        </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// TopDoctorsSection Component
function TopDoctorsSection() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Stone",
      specialty: "Cardiologist",
      image: "/doctor1.jpg",
    },
    {
      id: 2,
      name: "Dr. Michael Lee",
      specialty: "Dermatologist",
      image: "/doctor2.jpg",
    },
    {
      id: 3,
      name: "Dr. Sophia Patel",
      specialty: "Neurologist",
      image: "/doctor3.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Meet Our Top Doctors
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
                <Button className="mt-4 w-full bg-[#4169E1] text-white hover:bg-blue-700">
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// SpecialtiesSection Component
function SpecialtiesSection() {
  const specialties = [
    { id: 1, name: "Cardiology", icon: HeartPulse },
    { id: 2, name: "Dermatology", icon: Users },
    { id: 3, name: "Neurology", icon: BrainCircuit },
    { id: 4, name: "Orthopedics", icon: Users },
    { id: 5, name: "Pediatrics", icon: HeartPulse },
    { id: 6, name: "Psychiatry", icon: BrainCircuit },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          What People Are Looking For
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <specialty.icon className="w-12 h-12 text-[#4169E1] mb-4" />
              <h3 className="text-xl font-semibold">{specialty.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// TestimonialsSection Component
function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Alice Williams",
      comment:
        "Medichain provided excellent service, and the doctors were very professional.",
      image: "/patient1.jpg",
    },
    {
      id: 2,
      name: "Michael Brown",
      comment:
        "Booking an appointment was so easy, and the care I received was top-notch!",
      image: "/patient2.jpg",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      comment:
        "Highly recommend Medichain for anyone looking for quality healthcare services.",
      image: "/patient3.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          What Customers Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <Quote className="w-8 h-8 text-[#4169E1] mb-4" />
              <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <h3 className="ml-4 text-lg font-semibold">
                  {testimonial.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTASection Component
function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="w-full px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Download Our App
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Get the Medichain app to book appointments, manage your health records,
          and consult with doctors on the go.
        </p>
        <Button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg hover:bg-gray-100">
          Download Now
        </Button>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="w-full px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo and Address */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="Medichain Logo" className="h-10 w-10" />
              <span className="text-xl font-bold">Medichain</span>
            </div>
            <p className="text-gray-400">
              Get the best healthcare services at your convenience.
            </p>
          </div>
          {/* Footer Links */}
          <FooterLinks
            title="Specialties"
            links={[
              "Gynecologist",
              "Cardiologists",
              "Endocrinologists",
              "Dermatologists",
            ]}
          />
          <FooterLinks
            title="Useful Links"
            links={["About Us", "Book a Doctor", "Contact Us"]}
          />
          <div>
            <h4 className="font-semibold mb-4">Subscribe Us</h4>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border-gray-700 text-white w-full mb-4"
            />
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4">
        <div className="w-full px-4 text-center text-gray-400 text-sm">
          <p>&copy; 2024 All rights reserved</p>
          <p>Designed with love by Group 242</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinksProps {
  title: string;
  links: string[];
}

const FooterLinks = ({ title, links }: FooterLinksProps) => (
  <div>
    <h4 className="font-semibold mb-4">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-gray-400 hover:text-white">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);