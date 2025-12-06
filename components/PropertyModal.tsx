import React, { useState, useEffect, useCallback } from 'react';
import { Property } from '../types';
import { X, Check, MapPin, Bed, Bath, Square, Phone, Mail, ChevronLeft, ChevronRight, ZoomIn, LayoutGrid, LayoutList, Grid3X3, Image as ImageIcon } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onNavigate?: (view: 'home' | 'about' | 'sale' | 'rent' | 'contact') => void;
}


export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onNavigate }) => {
  // All hooks must be called on every render, even if property is null
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid' | 'masonry'>('grid');
  const [contactCollapsed, setContactCollapsed] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'units' | 'interior' | 'amenities' | 'all'>('all');
  // Touch swipe for lightbox
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Open Lightbox with specific context
  const openLightbox = (images: string[], index: number) => {
    if (!images || images.length === 0) return;
    setLightboxImages(images);
    setLightboxIndex(index % images.length);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImages([]);
    setLightboxIndex(0);
  };

  const nextLightboxImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  }, [lightboxImages.length]);

  const prevLightboxImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  }, [lightboxImages.length]);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextLightboxImage, prevLightboxImage]);

  // Touch handlers must always be defined
  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || lightboxImages.length <= 1) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const threshold = 40;
    if (deltaX > threshold) prevLightboxImage();
    if (deltaX < -threshold) nextLightboxImage();
    setTouchStartX(null);
  };

  if (!property) return null;

  // Helper to determine the section title based on property ID
  const getUnitSectionTitle = (id: string) => {
    if (id === 'oak-breeze') return 'Oak_Breeze_Residency_Brochure';
    if (id === 'brookside-oak') return 'New Renders Floor Plan';
    return 'Unit Options & Floor Plans';
  };

  const unitSectionTitle = getUnitSectionTitle(property.id);

  // Extract all unit images for the lightbox context
  const allUnitImages = property.units?.map(u => u.image) || [];

  // Aggregate all imagery for a single slideshow experience
  const aggregatedImages: string[] = [
    ...allUnitImages,
    ...(property.interiorGalleries?.flatMap(g => g.images) || []),
    ...(property.amenitiesGallery || []),
    ...(property.gallery || []),
    // Include brochure panels for Oak Breeze (webp pages) so they can be browsed too
    ...(property.id === 'oak-breeze'
      ? property.interiorGalleries?.find(g => g.title.includes('Brochure'))?.images || []
      : [])
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-none sm:rounded-lg shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in duration-300 border-t-4 border-accent">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-white/80 p-2 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <X size={24} className="text-gray-800" />
        </button>

        <div className="h-64 sm:h-80 w-full relative shrink-0 bg-gray-200">
          <ImageWithSkeleton 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent p-6 sm:p-8 z-20">
             <div className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 mb-3 uppercase tracking-widest">
                For {property.category}
             </div>
             <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-2">{property.title}</h2>
             <div className="flex items-center text-white/90 text-lg">
                <MapPin size={20} className="mr-2" />
                {property.address}, {property.city}
             </div>
           </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8 bg-cream">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Price</p>
              <p className="text-3xl sm:text-4xl font-bold text-accent font-serif">{property.priceLabel || `KES ${property.price.toLocaleString()}`}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex gap-6 sm:gap-8 bg-white p-4 rounded-lg shadow-sm">
                 <div className="flex flex-col items-center min-w-[60px]">
                    <Bed size={24} className="text-primary mb-1" />
                    <span className="font-bold text-lg text-gray-800">{property.beds}</span>
                    <span className="text-xs text-gray-500 uppercase">Beds</span>
                 </div>
                 <div className="flex flex-col items-center min-w-[60px]">
                    <Bath size={24} className="text-primary mb-1" />
                    <span className="font-bold text-lg text-gray-800">{property.baths}</span>
                    <span className="text-xs text-gray-500 uppercase">Baths</span>
                 </div>
                 <div className="flex flex-col items-center min-w-[60px]">
                    <Square size={24} className="text-primary mb-1" />
                    <span className="font-bold text-lg text-gray-800">{property.sqft}</span>
                    <span className="text-xs text-gray-500 uppercase">Sq M</span>
                 </div>
              </div>
              {aggregatedImages.length > 0 && (
                <button
                  onClick={() => openLightbox(aggregatedImages, 0)}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg shadow hover:bg-primary/90 transition-colors"
                >
                  <Grid3X3 size={18} />
                  <span className="text-sm font-semibold">View All ({aggregatedImages.length})</span>
                </button>
              )}
            </div>
          </div>

          <div className={`grid gap-8 ${contactCollapsed ? 'md:grid-cols-1' : 'md:grid-cols-3'}`}>
            <div className="md:col-span-2 space-y-8">
              
              {/* Unit Options / New Renders Section */}
              {property.units && property.units.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4 border-l-4 border-accent pl-3">
                    <div>
                      <div className="text-xs text-gray-500 font-mono mb-1 uppercase tracking-tight">
                        Mwalali Homes &gt; {property.title} &gt; {unitSectionTitle}
                      </div>
                      <h3 className="text-xl font-bold text-primary font-serif">{unitSectionTitle}</h3>
                    </div>
                    <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-accent' : 'text-gray-500 hover:text-gray-700'}`}
                        title="Grid View"
                      >
                        <Grid3X3 size={18} />
                      </button>
                      <button 
                        onClick={() => setViewMode('masonry')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'masonry' ? 'bg-white shadow text-accent' : 'text-gray-500 hover:text-gray-700'}`}
                        title="Masonry View"
                      >
                        <LayoutGrid size={18} />
                      </button>
                      <button 
                        onClick={() => setViewMode('carousel')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'carousel' ? 'bg-white shadow text-accent' : 'text-gray-500 hover:text-gray-700'}`}
                        title="Carousel View"
                      >
                        <LayoutList size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {property.units.map((unit, idx) => (
                        <div 
                          key={idx} 
                          className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                          onClick={() => openLightbox(allUnitImages, idx)}
                        >
                          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                            <ImageWithSkeleton 
                              src={unit.image} 
                              alt={unit.name} 
                              className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-lg" size={32}/>
                            </div>
                            <div className="absolute top-2 right-2 bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm">
                              {unit.type}
                            </div>
                          </div>
                          <div className="p-3 bg-white">
                            <h4 className="font-bold text-primary text-sm leading-tight truncate">{unit.name}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{unit.size}</p>
                            <p className="text-accent font-bold text-sm mt-2">{unit.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : viewMode === 'masonry' ? (
                    <div className="columns-2 sm:columns-3 gap-4 space-y-4">
                      {property.units.map((unit, idx) => (
                        <div 
                          key={idx} 
                          className="group break-inside-avoid bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer mb-4"
                          onClick={() => openLightbox(allUnitImages, idx)}
                        >
                          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                            <ImageWithSkeleton 
                              src={unit.image} 
                              alt={unit.name} 
                              className="w-full h-auto object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-lg" size={28}/>
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="font-bold text-xs truncate">{unit.name}</p>
                              <p className="text-accent text-xs font-semibold">{unit.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative group/carousel">
                       <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
                          {property.units.map((unit, idx) => (
                             <div key={idx} className="snap-center shrink-0 w-[280px] sm:w-[320px] bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden flex flex-col">
                                <div 
                                  className="relative aspect-[4/3] bg-gray-100 cursor-pointer overflow-hidden group/image" 
                                  onClick={() => openLightbox(allUnitImages, idx)}
                                >
                                   <ImageWithSkeleton 
                                      src={unit.image} 
                                      alt={unit.name} 
                                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover/image:scale-105"
                                      loading="lazy"
                                   />
                                   <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors flex items-center justify-center z-20">
                                      <ZoomIn className="text-white opacity-0 group-hover/image:opacity-100 transform scale-75 group-hover/image:scale-100 transition-all drop-shadow-lg" size={32}/>
                                   </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                   <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-bold text-primary text-lg leading-tight">{unit.name}</h4>
                                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium shrink-0 ml-2">{unit.size}</span>
                                   </div>
                                   <p className="text-sm text-gray-500 mb-3">{unit.type}</p>
                                   <div className="mt-auto pt-3 border-t border-gray-100">
                                      <p className="text-accent font-bold text-lg">{unit.price}</p>
                                   </div>
                                </div>
                             </div>
                          ))}
                       </div>
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/80 p-2 rounded-full shadow-lg md:hidden pointer-events-none">
                          <ChevronRight size={24} className="text-accent animate-pulse"/>
                       </div>
                    </div>
                  )}
                </div>
              )}

              {/* Interior Galleries Section */}
              {property.interiorGalleries && property.interiorGalleries.map((gallery, gIdx) => (
                <div key={gIdx} className="mt-8">
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-bold text-primary font-serif border-l-4 border-accent pl-3">
                        {gallery.title}
                     </h3>
                     <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full font-semibold">
                       {gallery.images.length} images
                     </span>
                   </div>
                   
                   {/* Creative 3-column grid with featured first image */}
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                     {gallery.images.slice(0, 6).map((img, idx) => (
                       <div 
                         key={idx} 
                         className={`group relative bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${
                           idx === 0 ? 'col-span-2 row-span-2 aspect-square sm:aspect-[4/3]' : 'aspect-square'
                         }`}
                         onClick={() => openLightbox(gallery.images, idx)}
                       >
                         <ImageWithSkeleton 
                           src={img} 
                           alt={`${gallery.title} ${idx + 1}`} 
                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           loading="lazy"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                         <div className="absolute inset-0 flex items-center justify-center">
                           <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-lg" size={idx === 0 ? 40 : 28}/>
                         </div>
                         {idx === 0 && (
                           <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm">
                             {gallery.badge || 'Featured'}
                           </div>
                         )}
                       </div>
                     ))}
                     
                     {/* Show "View More" if more than 6 images */}
                     {gallery.images.length > 6 && (
                       <div 
                         className="group relative bg-gradient-to-br from-primary to-primary/80 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 aspect-square flex items-center justify-center"
                         onClick={() => openLightbox(gallery.images, 6)}
                       >
                         <div className="text-center text-white p-4">
                           <ImageIcon size={32} className="mx-auto mb-2 opacity-80" />
                           <p className="font-bold text-lg">+{gallery.images.length - 6}</p>
                           <p className="text-xs opacity-80">View More</p>
                         </div>
                       </div>
                     )}
                   </div>
                </div>
              ))}

              <div>
                <h3 className="text-xl font-bold text-primary mb-4 font-serif border-l-4 border-accent pl-3">Property Details</h3>
                <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  {property.description}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-4 font-serif border-l-4 border-accent pl-3">Amenities & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 bg-white p-3 rounded border border-gray-100">
                      <Check size={18} className="text-accent mr-3 shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Amenities Gallery Grid - Creative 3x3 Layout */}
                {property.amenitiesGallery && property.amenitiesGallery.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-primary font-serif border-l-4 border-accent pl-3">{property.title} Amenities Gallery</h4>
                      <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-semibold">
                        {property.amenitiesGallery.length} photos
                      </span>
                    </div>
                    
                    {/* 3-column responsive grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {property.amenitiesGallery.slice(0, 9).map((img, idx) => (
                        <div 
                          key={idx} 
                          className={`group relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 ${
                            idx === 0 || idx === 4 ? 'aspect-[4/3]' : 'aspect-square'
                          }`}
                          onClick={() => openLightbox(property.amenitiesGallery!, idx)}
                        >
                          <ImageWithSkeleton 
                            src={img} 
                            alt={`Amenity ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-md" size={24}/>
                          </div>
                        </div>
                      ))}
                      
                      {/* View all button if more than 9 images */}
                      {property.amenitiesGallery.length > 9 && (
                        <div 
                          className="group relative bg-gradient-to-br from-accent to-orange-600 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 aspect-square flex items-center justify-center"
                          onClick={() => openLightbox(property.amenitiesGallery!, 9)}
                        >
                          <div className="text-center text-white">
                            <p className="font-bold text-2xl">+{property.amenitiesGallery.length - 9}</p>
                            <p className="text-xs opacity-90">View All</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Legacy Gallery (Fallback) */}
              {(!property.units && !property.interiorGalleries && !property.amenitiesGallery) && property.gallery && property.gallery.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4 font-serif border-l-4 border-accent pl-3">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.gallery.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative" 
                        onClick={() => openLightbox(property.gallery!, idx)}
                      >
                        <ImageWithSkeleton 
                          src={img} 
                          alt={`Gallery ${idx}`} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!contactCollapsed && (
              <div className="md:col-span-1">
                <div className="bg-primary text-white p-6 rounded-lg shadow-xl sticky top-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold font-serif">Interested?</h3>
                      <p className="text-gray-300 mt-1 text-sm">
                        Secure your space today. Contact Mwalali Homes for bookings and inquiries.
                      </p>
                    </div>
                    <button
                      onClick={() => setContactCollapsed(true)}
                      className="text-white/70 hover:text-white text-xs uppercase tracking-wide border border-white/20 rounded px-2 py-1"
                    >
                      Hide
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                      <a href="tel:+254721615737" className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors">
                          <Phone size={18} />
                          <span className="font-mono text-sm">+254 721 615 737</span>
                      </a>
                      <a href="tel:+254701009827" className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors">
                          <Phone size={18} />
                          <span className="font-mono text-sm">+254 701 009 827</span>
                      </a>
                      <a href="mailto:mwalalihomes@gmail.com" className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors">
                          <Mail size={18} />
                          <span className="text-sm">mwalalihomes@gmail.com</span>
                      </a>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onNavigate?.('contact');
                    }}
                    className="w-full bg-accent hover:bg-orange-700 text-white font-bold py-4 px-4 rounded transition-all shadow-lg flex items-center justify-center gap-2 mb-3 uppercase tracking-wider text-sm text-center"
                  >
                    Request Payment Plan
                  </button>
                  {property.id === 'oak-breeze' ? (
                    <a
                      href="/brochures/Oak_Breeze_Residency_Brochure.pdf"
                      download="Oak_Breeze_Residency_Brochure.webp"
                      className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded transition-colors text-sm border border-white/20 block text-center"
                    >
                      Download Brochure
                    </a>
                  ) : (
                    <div className="w-full bg-white/5 text-white/70 font-semibold py-3 px-4 rounded text-sm border border-white/10 text-center">
                      Brochure available soon
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {contactCollapsed && (
        <button
          onClick={() => setContactCollapsed(false)}
          className="fixed bottom-6 right-6 z-[70] bg-primary text-white px-4 py-3 rounded-full shadow-2xl hover:bg-primary/90 flex items-center gap-2"
        >
          <Phone size={18} />
          Show Contact Panel
        </button>
      )}

      {/* Advanced Lightbox Modal with Thumbnail Strip */}
      {lightboxOpen && lightboxImages.length > 0 && (
         <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col animate-in fade-in duration-200">
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[70] p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
            >
               <X size={32} />
            </button>

            {/* Navigation Buttons */}
              {lightboxImages.length > 1 && (
              <>
                <button 
                  onClick={prevLightboxImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[70] p-3 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110"
                >
                  <ChevronLeft size={40} />
                </button>
                <button 
                  onClick={nextLightboxImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[70] p-3 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
            
            {/* Image Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-1.5 rounded-full text-white text-sm font-medium backdrop-blur-sm z-[70]">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>

            {/* Main Image */}
            <div 
              className="flex-1 flex items-center justify-center p-4 sm:p-8 pb-24" 
              onClick={closeLightbox}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
               {lightboxImages[lightboxIndex].toLowerCase().endsWith('.pdf') ? (
                  <iframe 
                    key={lightboxIndex}
                    src={lightboxImages[lightboxIndex]}
                    className="w-full h-full max-h-[70vh] bg-white shadow-2xl rounded-sm"
                    title="Zoomed PDF"
                    onClick={(e) => e.stopPropagation()}
                  />
               ) : (
                  <img 
                    key={lightboxIndex}
                    src={lightboxImages[lightboxIndex]} 
                    alt={`Zoomed View ${lightboxIndex + 1}`} 
                    className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-sm animate-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()} 
                    onError={(e) => {
                      const fallback = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src !== fallback) target.src = fallback;
                    }}
                  />
               )}
            </div>

            {/* Thumbnail Strip */}
            {lightboxImages.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-3 px-4 z-[70]">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center max-w-4xl mx-auto">
                  {lightboxImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(idx);
                      }}
                      className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                        idx === lightboxIndex 
                          ? 'ring-2 ring-accent ring-offset-2 ring-offset-black scale-105' 
                          : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
         </div>
      )}
    </div>
  );
};