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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#FFD700]/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Diamond className="w-6 h-6 text-[#FFD700] animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
              DiamondAli
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#FFD700] transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#FFD700] transition-colors">About</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#FFD700] transition-colors">Services</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-[#FFD700] transition-colors">Portfolio</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#FFD700] transition-colors">Contact</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#FFD700]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-[#FFD700]/20">
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

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Diamond className="w-16 h-16 md:w-20 md:h-20 text-[#FFD700] animate-pulse mr-4" />
            <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-[#FFD700] via-yellow-300 to-[#FFD700] bg-clip-text text-transparent">
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
              className="bg-gradient-to-r from-[#FFD700] to-yellow-600 text-black font-semibold px-8 py-3 rounded-lg hover:from-yellow-600 hover:to-[#FFD700] transition-all duration-300 transform hover:scale-105"
            >
              View My Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-full p-2">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_f3ccd94a-230a-4c4f-abea-71a2b6e3d340/artifacts/zrzzxgg1_Snapchat-652653254.jpg"
                    alt="Ali Rafiq Khokhar - DiamondAli"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
                About DiamondAli
              </h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Hi! I'm <strong className="text-[#FFD700]">Ali Rafiq Khokhar</strong>, your dedicated VIP developer specializing in premium websites and mobile applications. With years of experience in creating luxury digital solutions, I transform business ideas into stunning, high-performance digital experiences.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                From e-commerce stores to booking systems, I deliver nothing but the best. Every project is treated with VIP attention to detail, ensuring your digital presence stands out in the competitive market.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-[#FFD700] text-black font-medium">Websites</Badge>
                <Badge className="bg-[#FFD700] text-black font-medium">Mobile Apps</Badge>
                <Badge className="bg-[#FFD700] text-black font-medium">E-Commerce</Badge>
                <Badge className="bg-[#FFD700] text-black font-medium">Booking Systems</Badge>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/quantumali5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#FFD700] text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a 
                  href="https://wa.me/917567649104?text=Hello%20DiamondAli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[#FFD700] text-[#FFD700] px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-black transition-colors"
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            VIP Services
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Premium digital solutions tailored for your business success
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="bg-gray-900 border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all duration-300 hover:transform hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            Premium Service Details
          </h2>

          <div className="space-y-20">
            {services.slice(0, 3).map((service, index) => (
              <div key={service.id} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="w-16 h-16 mb-6 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-full flex items-center justify-center">
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
                    className="bg-gradient-to-r from-[#FFD700] to-yellow-600 text-black font-semibold px-8 py-3 rounded-lg hover:from-yellow-600 hover:to-[#FFD700] transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="relative">
                    <img 
                      src={portfolioProjects[index]?.image} 
                      alt={service.title}
                      className="w-full h-80 object-cover rounded-lg shadow-2xl"
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
      <section id="portfolio" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            VIP Portfolio
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Showcase of premium projects delivered with excellence
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <Card key={project.id} className="bg-gray-900 border-[#FFD700]/20 overflow-hidden hover:border-[#FFD700]/50 transition-all duration-300 transform hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-[#FFD700] text-black">{project.category}</Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-[#FFD700]">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-gradient-to-r from-[#FFD700] to-yellow-600 text-black font-semibold hover:from-yellow-600 hover:to-[#FFD700] transition-all duration-300"
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            Why Choose DiamondAli?
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            VIP advantages that set us apart from the competition
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {whyChooseMe.map((item) => (
              <Card key={item.id} className="bg-gradient-to-b from-gray-900 to-gray-800 border-[#FFD700]/20 text-center p-8 hover:border-[#FFD700]/50 transition-all duration-300 transform hover:scale-105 group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
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
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            What our VIP clients say about our premium services
          </p>

          <div className="relative">
            <Card className="bg-gray-900 border-[#FFD700]/20 p-8">
              <CardContent className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[#FFD700] fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-lg mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD700]"
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
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[#FFD700]' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            VIP Work Process
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Our premium 4-step approach to delivering excellence
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((step, index) => (
              <div key={step.id} className="relative">
                <Card className="bg-gray-900 border-[#FFD700]/20 p-6 text-center hover:border-[#FFD700]/50 transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-full flex items-center justify-center">
                    {getIcon(step.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-[#FFD700]">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </Card>
                
                {/* Process Arrow (hidden on mobile) */}
                {index < workProcess.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-[#FFD700] transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            VIP Pricing Plans
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Choose the perfect package for your business needs
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${
                plan.recommended 
                  ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-[#FFD700] scale-105' 
                  : 'bg-gray-900 border-[#FFD700]/20'
              } p-8 text-center hover:border-[#FFD700]/50 transition-all duration-300`}>
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFD700] text-black">
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
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <Crown className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 ${
                      plan.recommended
                        ? 'bg-gradient-to-r from-[#FFD700] to-yellow-600 text-black hover:from-yellow-600 hover:to-[#FFD700]'
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Everything you need to know about our VIP services
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id.toString()} className="bg-gray-900 border-[#FFD700]/20 rounded-lg px-6">
                <AccordionTrigger className="text-left text-[#FFD700] hover:text-yellow-300 py-6">
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
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
            Get Your VIP Project Started
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Ready to transform your business? Let's discuss your premium digital solution
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-[#FFD700]">Connect with DiamondAli</h3>
              
              <div className="space-y-6 mb-8">
                <a 
                  href="https://www.instagram.com/quantumali5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Instagram</h4>
                    <p className="text-gray-400">@quantumali5</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#FFD700] ml-auto" />
                </a>

                <a 
                  href="https://wa.me/917567649104?text=Hello%20DiamondAli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-full flex items-center justify-center group-hover:animate-pulse">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">WhatsApp</h4>
                    <p className="text-gray-400">Direct chat available</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#FFD700] ml-auto" />
                </a>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4 text-[#FFD700]">Why Choose VIP Service?</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#FFD700]" />
                    Premium quality guaranteed
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#FFD700]" />
                    24/7 direct support
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#FFD700]" />
                    Fast project delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#FFD700]" />
                    Custom solutions only
                  </li>
                </ul>
              </div>
            </div>

            <Card className="bg-gray-900 border-[#FFD700]/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#FFD700]">Send Message</CardTitle>
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
                      className="bg-gray-800 border-gray-700 text-white focus:border-[#FFD700] focus:ring-[#FFD700]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="bg-gray-800 border-gray-700 text-white focus:border-[#FFD700] focus:ring-[#FFD700]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Project Details</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your VIP project requirements..."
                      rows={5}
                      className="bg-gray-800 border-gray-700 text-white focus:border-[#FFD700] focus:ring-[#FFD700]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FFD700] to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-yellow-600 hover:to-[#FFD700] transition-all duration-300"
                  >
                    Send VIP Message
                    <ArrowRight className="w-4 h-4 ml-2" />
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
            <div className="flex items-center gap-2">
              <Diamond className="w-8 h-8 text-[#FFD700] animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#FFD700] to-yellow-300 bg-clip-text text-transparent">
                DiamondAli
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-[#FFD700] transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-[#FFD700] transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-400 hover:text-[#FFD700] transition-colors">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#FFD700] transition-colors">
                Contact
              </button>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/quantumali5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/917567649104?text=Hello%20DiamondAli" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#FFD700]/20 mt-8 pt-8 text-center">
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