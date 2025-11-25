"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Home, Info, BookOpen, Gamepad2, School } from "lucide-react"
import AccessFormModal from "@/components/AccessFormModal"
import zapfyLogo from "@/assets/zapfy-logo-icon.png"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true) // Inicialmente visível
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const handleAccessClick = () => setIsModalOpen(true)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        
        // Se estiver no topo, mostrar
        if (currentScrollY < 50) {
          setIsVisible(true)
        }
        // Se rolando para cima, mostrar
        else if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        } 
        // Se rolando para baixo, esconder
        else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false)
        }
        
        setLastScrollY(currentScrollY)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
      return () => window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const navigationItems = [
    { name: "Inicio", href: "#hero", icon: Home },
    { name: "Sobre", href: "#about", icon: Info },
    { name: "Educação", href: "#benefits-parents", icon: BookOpen },
    { name: "Gamificação", href: "#benefits-kids", icon: Gamepad2 },
    { name: "Schools", href: "#schools", icon: School }
  ]

  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      // Navigate to external route
      window.location.href = href
    } else {
      // Scroll to section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-4 px-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-background/60 backdrop-blur-md border border-border/20 rounded-full px-8 py-3 shadow-lg w-full max-w-2xl">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center justify-center">
                <div className="flex items-center space-x-8">
                  {navigationItems.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-full transition-colors font-montserrat text-muted-foreground hover:text-foreground whitespace-nowrap"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center justify-between w-full">
                {/* Navigation Icons */}
                <div className="flex items-center gap-3">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <item.icon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </motion.button>
                  ))}
                </div>
                
                {/* Menu Button */}
                <motion.button 
                  className="flex items-center p-2 rounded-full hover:bg-primary/10 transition-colors" 
                  onClick={toggleMenu} 
                  whileTap={{ scale: 0.9 }}
                >
                  <Menu className="h-5 w-5 text-muted-foreground" />
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {isOpen && (
                  <motion.div
                    className="fixed inset-0 bg-background z-50 pt-24 px-6 md:hidden"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    <motion.button
                      className="absolute top-6 right-6 p-2"
                      onClick={toggleMenu}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <X className="h-6 w-6 text-foreground" />
                    </motion.button>
                    <div className="flex flex-col space-y-6">
                      {navigationItems.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.1 }}
                          exit={{ opacity: 0, x: 20 }}
                        >
                          <button
                            onClick={() => handleNavigation(item.href)}
                            className="flex items-center gap-3 text-base font-montserrat font-medium text-foreground"
                          >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AccessFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export { Navbar1 }