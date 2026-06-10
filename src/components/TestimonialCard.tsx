import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  text: string;
  author: string;
  meta: string;
  image: string;
}

export default function TestimonialCard({ text, author, meta, image }: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-text">{text}</p>
      <div className="testimonial-author">
        <div className="author-avatar">
          <Image
            src={image}
            alt={author}
            fill
            sizes="44px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="author-info">
          <span className="author-name">{author}</span>
          <span className="author-meta">{meta}</span>
        </div>
      </div>
    </div>
  );
}
