"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "react-feather"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-white shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <a 
          href="/" 
          className="flex items-center space-x-2"
          aria-label="MediChain Home"
        >
          <img src="/logo.png" alt="" className="w-auto h-8" />
          <span className="text-2xl font-bold text-[#4169E1]">MediChain</span>
        </a>
        
        <div className="ml-auto flex items-center">
          <button 
            className="sm:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden sm:flex gap-6 items-center">
            <NavLinks />
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-white" />
            
            {/* Mobile Menu Content */}
            <div className="relative h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <a href="/" className="flex items-center space-x-2">
                  <img src="/logo.png" alt="" className="w-auto h-8" />
                  <span className="text-2xl font-bold text-[#4169E1]">MediChain</span>
                </a>
                <button
                  className="p-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="px-4 py-6">
                <div className="flex flex-col gap-6">
                  <NavLinks mobile setIsOpen={setIsOpen} />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavLinks({ mobile, setIsOpen }: { mobile?: boolean, setIsOpen?: (open: boolean) => void }) {
  const links = [
    { href: "/find-doctors", label: "Find Doctors" },
    { href: "/specialities", label: "Specialities" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const handleClick = () => {
    if (mobile && setIsOpen) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`
            text-gray-600 hover:text-[#4169E1] transition-colors
            ${mobile ? 'text-xl py-2' : ''}
          `}
          onClick={handleClick}
        >
          {link.label}
        </a>
      ))}
      <Button 
        className={`bg-[#4169E1] text-white hover:bg-blue-700 ${mobile ? 'w-full mt-4' : ''}`}
        onClick={handleClick}
      >
        Book Appointment
      </Button>
    </>
  )
}