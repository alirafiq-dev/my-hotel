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
  Phone, Mail, ExternalLink, ChevronLeft, ChevronRight, Menu, X, Send, Loader2
} from 'lucide-react';
import axios from 'axios';

import {
  portfolioProjects,
  services,
  testimonials,
  whyChooseMe,
  workProcess,
  pricingPlans,
  faqs
} from '../mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DiamondAliPortfolio = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const { toast } = useToast();

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      setParallaxY(parallax);
      
      // Update CSS custom property for parallax elements
      document.documentElement.style.setProperty('--parallax-y', `${parallax}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Handle form submission with backend integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "Thank you for your VIP message. I'll get back to you within 24 hours!",
      });
      
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      let errorMessage = "Failed to send message. Please try again.";
      
      if (error.response?.status === 429) {
        errorMessage = "Too many messages sent. Please wait before sending another message.";
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.detail || "Please check your message and try again.";
      }
      
      toast({
        title: "Error Sending Message ❌",
        description: errorMessage,
        variant: "destructive"
      });
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Floating particles component
  const FloatingParticles = () => (
    <div className="floating-particles">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="particle"></div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-['Montserrat',sans-serif] optimize-animations">
      <Toaster />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#FFD700]/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Diamond className="w-6 h-6 text-[#FFD700] animate-diamond-pulse" />
            <span className="text-xl font-bold text-shimmer">
              DiamondAli
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#FFD700] transition-all duration-300 hover:scale-110">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#FFD700] transition-all duration-300 hover:scale-110">About</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#FFD700] transition-all duration-300 hover:scale-110">Services</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-[#FFD700] transition-all duration-300 hover:scale-110">Portfolio</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#FFD700] transition-all duration-300 hover:scale-110">Contact</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#FFD700] hover:scale-110 transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-[#FFD700]/20 animate-slide-up">
            <div className="flex flex-col gap-4 p-4">
              <button onClick={() => scrollToSection('hero')} className="text-left hover:text-[#FFD700] transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-[#FFD700] transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-[#FFD700] transition-colors">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-left hover:text-[#FFD700] transition-colors">Portfolio</button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-[#FFD700] transition-colors">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Floating Particles */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden vip-gradient">
        <FloatingParticles />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in parallax-element parallax-slow">
          <div className="flex items-center justify-center mb-6 animate-float">
            <Diamond className="w-16 h-16 md:w-20 md:h-20 text-[#FFD700] animate-diamond-pulse mr-4" />
            <h1 className="text-4xl md:text-7xl font-bold text-shimmer">
              DiamondAli
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            VIP Websites & Mobile Apps
          </p>
          
          <p className="text-base md:text-lg mb-12 text-gray-400 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            Premium digital solutions crafted with luxury design and cutting-edge technology. 
            Transform your business with VIP-level websites and mobile applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Button 
              onClick={() => scrollToSection('portfolio')}
              className="vip-button gold-gradient text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              View My Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="vip-button border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black px-8 py-3 rounded-lg transition-all duration-300"
            >
              Contact Me
              <MessageSquare className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 parallax-element parallax-medium">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-slide-up">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 gold-gradient rounded-full p-2 animate-gold-glow">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_f3ccd94a-230a-4c4f-abea-71a2b6e3d340/artifacts/zrzzxgg1_Snapchat-652653254.jpg"
                    alt="Ali Rafiq Khokhar - DiamondAli"
                    className="w-full h-full object-cover rounded-full gpu-accelerated"
                  />
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shimmer">
                About DiamondAli
              </h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Hi! I'm <strong className="text-[#FFD700]">Ali Rafiq Khokhar</strong>, your dedicated VIP developer specializing in premium websites and mobile applications. With years of experience in creating luxury digital solutions, I transform business ideas into stunning, high-performance digital experiences.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                From e-commerce stores to booking systems, I deliver nothing but the best. Every project is treated with VIP attention to detail, ensuring your digital presence stands out in the competitive market.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="gold-gradient text-black font-medium animate-slide-up">Websites</Badge>
                <Badge className="gold-gradient text-black font-medium animate-slide-up" style={{animationDelay: '0.1s'}}>Mobile Apps</Badge>
                <Badge className="gold-gradient text-black font-medium animate-slide-up" style={{animationDelay: '0.2s'}}>E-Commerce</Badge>
                <Badge className="gold-gradient text-black font-medium animate-slide-up" style={{animationDelay: '0.3s'}}>Booking Systems</Badge>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/quantumali5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="vip-button flex items-center gap-2 gold-gradient text-black px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a 
                  href="https://wa.me/917567649104?text=Hello%20DiamondAli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="vip-button flex items-center gap-2 border border-[#FFD700] text-[#FFD700] px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-black transition-all duration-300"
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
      <section id="services" className="py-20 px-4 vip-gradient parallax-element parallax-fast">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-shimmer animate-slide-up">
            VIP Services
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Premium digital solutions tailored for your business success
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <Card key={service.id} className="card-3d-tilt bg-gray-900 border-[#FFD700]/20 hover:border-[#FFD700]/50 gpu-accelerated animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 gold-gradient rounded-full flex items-center justify-center animate-gold-glow">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-[#FFD700]">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-20 px-4 parallax-element parallax-slow">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-shimmer animate-slide-up">
            Premium Service Details
          </h2>

          <div className="space-y-20">
            {services.slice(0, 3).map((service, index) => (
              <div key={service.id} className={`grid md:grid-cols-2 gap-12 items-center animate-slide-up ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="w-16 h-16 mb-6 gold-gradient rounded-full flex items-center justify-center animate-gold-glow">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#FFD700]">{service.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">{service.description}</p>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Our premium approach ensures every project exceeds expectations with cutting-edge technology, 
                    luxury design principles, and VIP-level attention to detail. We don't just build applications; 
                    we craft digital masterpieces.
                  </p>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="vip-button gold-gradient text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="relative card-3d">
                    <img 
                      src={portfolioProjects[index]?.image} 
                      alt={service.title}
                      className="w-full h-80 object-cover rounded-lg shadow-2xl gpu-accelerated"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 to-transparent rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 vip-gradient parallax-element parallax-medium">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-shimmer animate-slide-up">
            VIP Portfolio
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Showcase of premium projects delivered with excellence
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <Card key={project.id} className="card-3d-tilt bg-gray-900 border-[#FFD700]/20 overflow-hidden hover:border-[#FFD700]/50 gpu-accelerated animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110 gpu-accelerated"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 gold-gradient text-black animate-gold-glow">{project.category}</Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-[#FFD700]">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="vip-button w-full gold-gradient text-black font-semibold transition-all duration-300"
                  >
                    Get This
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 px-4 parallax-element parallax-slow">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-shimmer animate-slide-up">
            Why Choose DiamondAli?
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            VIP advantages that set us apart from the competition
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {whyChooseMe.map((item, index) => (
              <Card key={item.id} className="card-3d-tilt vip-gradient border-[#FFD700]/20 text-center p-8 hover:border-[#FFD700]/50 gpu-accelerated animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="w-16 h-16 mx-auto mb-6 gold-gradient rounded-full flex items-center justify-center animate-gold-glow">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 vip-gradient parallax-element parallax-fast">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-shimmer animate-slide-up">
            Client Testimonials
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            What our VIP clients say about our premium services
          </p>

          <div className="relative">
            <Card className="card-3d bg-gray-900 border-[#FFD700]/20 p-8 gpu-accelerated">
              <CardContent className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[#FFD700] fill-current animate-gold-glow" style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                </div>
                
                <p className="text-gray-300 text-lg mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD700] animate-gold-glow gpu-accelerated"
                  />
                  <div>
                    <h4 className="text-[#FFD700] font-semibold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-400 text-sm">{testimonials[currentTestimonial].position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#FFD700] animate-gold-glow scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-20 px-4 parallax-element parallax-slow">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-shimmer animate-slide-up">
            VIP Work Process
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Our premium 4-step approach to delivering excellence
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((step, index) => (
              <div key={step.id} className="relative animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <Card className="card-3d-tilt bg-gray-900 border-[#FFD700]/20 p-6 text-center hover:border-[#FFD700]/50 gpu-accelerated">
                  <div className="w-16 h-16 mx-auto mb-6 gold-gradient rounded-full flex items-center justify-center animate-gold-glow">
                    {getIcon(step.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-[#FFD700]">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </Card>
                
                {/* Process Arrow (hidden on mobile) */}
                {index < workProcess.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-[#FFD700] transform -translate-y-1/2 animate-float" style={{animationDelay: `${index * 0.5}s`}} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 px-4 vip-gradient parallax-element parallax-medium">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-shimmer animate-slide-up">
            VIP Pricing Plans
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Choose the perfect package for your business needs
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={plan.id} className={`card-3d-tilt relative ${
                plan.recommended 
                  ? 'vip-gradient border-[#FFD700] scale-105 animate-gold-glow' 
                  : 'bg-gray-900 border-[#FFD700]/20'
              } p-8 text-center hover:border-[#FFD700]/50 gpu-accelerated animate-slide-up`} style={{animationDelay: `${index * 0.2}s`}}>
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gold-gradient text-black animate-gold-glow">
                    RECOMMENDED
                  </Badge>
                )}
                
                <CardHeader className="pb-6">
                  <h3 className="text-2xl font-bold text-[#FFD700] mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                  <p className="text-gray-400">Starting from</p>
                </CardHeader>
                
                <CardContent className="pb-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-300">
                        <Crown className="w-4 h-4 text-[#FFD700] flex-shrink-0 animate-gold-glow" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className={`vip-button w-full font-semibold py-3 rounded-lg transition-all duration-300 ${
                      plan.recommended
                        ? 'gold-gradient text-black'
                        : 'border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black'
                    }`}
                    variant={plan.recommended ? 'default' : 'outline'}
                  >
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 parallax-element parallax-slow">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-shimmer animate-slide-up">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Everything you need to know about our VIP services
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.id} value={faq.id.toString()} className="card-3d bg-gray-900 border-[#FFD700]/20 rounded-lg px-6 gpu-accelerated animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <AccordionTrigger className="text-left text-[#FFD700] hover:text-yellow-300 py-6 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 vip-gradient parallax-element parallax-fast">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-shimmer animate-slide-up">
            Get Your VIP Project Started
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
            Ready to transform your business? Let's discuss your premium digital solution
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
              <h3 className="text-2xl font-bold mb-8 text-[#FFD700]">Connect with DiamondAli</h3>
              
              <div className="space-y-6 mb-8">
                <a 
                  href="https://www.instagram.com/quantumali5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card-3d flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center animate-gold-glow">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Instagram</h4>
                    <p className="text-gray-400">@quantumali5</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#FFD700] ml-auto group-hover:scale-110 transition-transform" />
                </a>

                <a 
                  href="https://wa.me/917567649104?text=Hello%20DiamondAli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card-3d flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center animate-gold-glow">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">WhatsApp</h4>
                    <p className="text-gray-400">Direct chat available</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#FFD700] ml-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <div className="card-3d bg-gray-900 p-6 rounded-lg animate-gold-glow">
                <h4 className="text-xl font-semibold mb-4 text-[#FFD700]">Why Choose VIP Service?</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#FFD700] animate-gold-glow" />
                    Premium quality guaranteed
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#FFD700] animate-gold-glow" />
                    24/7 direct support
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#FFD700] animate-gold-glow" />
                    Fast project delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#FFD700] animate-gold-glow" />
                    Custom solutions only
                  </li>
                </ul>
              </div>
            </div>

            <Card className="card-3d-tilt bg-gray-900 border-[#FFD700]/20 animate-slide-up gpu-accelerated" style={{animationDelay: '0.4s'}}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#FFD700]">Send VIP Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Your Name</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="bg-gray-800 border-gray-700 text-white focus:border-[#FFD700] focus:ring-[#FFD700] transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="bg-gray-800 border-gray-700 text-white focus:border-[#FFD700] focus:ring-[#FFD700] transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Project Details</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your VIP project requirements..."
                      rows={5}
                      className="bg-gray-800 border-gray-700 text-white focus:border-[#FFD700] focus:ring-[#FFD700] transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="vip-button w-full gold-gradient text-black font-semibold py-3 rounded-lg transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending VIP Message...
                      </>
                    ) : (
                      <>
                        Send VIP Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#FFD700]/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 animate-slide-up">
              <Diamond className="w-8 h-8 text-[#FFD700] animate-diamond-pulse" />
              <span className="text-xl font-bold text-shimmer">
                DiamondAli
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-[#FFD700] transition-all duration-300 hover:scale-110">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-[#FFD700] transition-all duration-300 hover:scale-110">
                About
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-400 hover:text-[#FFD700] transition-all duration-300 hover:scale-110">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#FFD700] transition-all duration-300 hover:scale-110">
                Contact
              </button>
            </div>

            <div className="flex gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <a 
                href="https://www.instagram.com/quantumali5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all duration-300 hover:scale-110 gpu-accelerated"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/917567649104?text=Hello%20DiamondAli" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all duration-300 hover:scale-110 gpu-accelerated"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#FFD700]/20 mt-8 pt-8 text-center animate-slide-up" style={{animationDelay: '0.6s'}}>
            <p className="text-gray-400">
              © 2025 DiamondAli – VIP Websites & Apps. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DiamondAliPortfolio;