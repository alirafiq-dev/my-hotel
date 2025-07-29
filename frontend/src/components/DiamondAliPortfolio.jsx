import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Toaster } from './ui/toaster';
import {
  Globe, Smartphone, ShoppingCart, Calendar, Settings, Crown, Shield, Building, Headphones,
  MessageCircle, Palette, Code, Rocket, Diamond, Instagram, MessageSquare, Star, ArrowRight,
  Phone, Mail, ExternalLink, ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';

import {
  portfolioProjects,
  services,
  testimonials,
  whyChooseMe,
  workProcess,
  pricingPlans,
  faqs
} from '../mock';

const DiamondAliPortfolio = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      Globe, Smartphone, ShoppingCart, Calendar, Settings, Crown, Shield, Building, Headphones,
      MessageCircle, Palette, Code, Rocket
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <Globe className="w-6 h-6" />;
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Montserrat',sans-serif]">
      <Toaster />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gold/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Diamond className="w-6 h-6 text-gold animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">
              DiamondAli
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('hero')} className="hover:text-gold transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-gold transition-colors">About</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-gold transition-colors">Services</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-gold transition-colors">Portfolio</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-gold transition-colors">Contact</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gold/20">
            <div className="flex flex-col gap-4 p-4">
              <button onClick={() => scrollToSection('hero')} className="text-left hover:text-gold transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-gold transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-gold transition-colors">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-left hover:text-gold transition-colors">Portfolio</button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-gold transition-colors">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Diamond className="w-16 h-16 md:w-20 md:h-20 text-gold animate-pulse mr-4" />
            <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
              DiamondAli
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            VIP Websites & Mobile Apps
          </p>
          
          <p className="text-base md:text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
            Premium digital solutions crafted with luxury design and cutting-edge technology. 
            Transform your business with VIP-level websites and mobile applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('portfolio')}
              className="bg-gradient-to-r from-gold to-yellow-600 text-black font-semibold px-8 py-3 rounded-lg hover:from-yellow-600 hover:to-gold transition-all duration-300 transform hover:scale-105"
            >
              View My Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-black px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Me
              <MessageSquare className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold to-yellow-600 rounded-full p-2">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_f3ccd94a-230a-4c4f-abea-71a2b6e3d340/artifacts/zrzzxgg1_Snapchat-652653254.jpg"
                    alt="Ali Rafiq Khokhar - DiamondAli"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">
                About DiamondAli
              </h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Hi! I'm <strong className="text-gold">Ali Rafiq Khokhar</strong>, your dedicated VIP developer specializing in premium websites and mobile applications. With years of experience in creating luxury digital solutions, I transform business ideas into stunning, high-performance digital experiences.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                From e-commerce stores to booking systems, I deliver nothing but the best. Every project is treated with VIP attention to detail, ensuring your digital presence stands out in the competitive market.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-gold text-black font-medium">Websites</Badge>
                <Badge className="bg-gold text-black font-medium">Mobile Apps</Badge>
                <Badge className="bg-gold text-black font-medium">E-Commerce</Badge>
                <Badge className="bg-gold text-black font-medium">Booking Systems</Badge>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/quantumali5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a 
                  href="https://wa.me/917567649104?text=Hello%20DiamondAli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gold text-gold px-4 py-2 rounded-lg hover:bg-gold hover:text-black transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">
            VIP Services
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Premium digital solutions tailored for your business success
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="bg-gray-900 border-gold/20 hover:border-gold/50 transition-all duration-300 hover:transform hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gold to-yellow-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gold">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </CardContent>
    </file>