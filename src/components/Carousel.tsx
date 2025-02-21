import React from "react";

interface CarouselProps {
    testimonials: { quote: string; author: string }[];
    index: number;
}

const Carousel = ({ testimonials, index }: CarouselProps) => {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {/* Chia testimonials thành các nhóm 3 phần tử */}
        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
          (_, i) => (
            <div key={i} className="flex p-4 min-w-full justify-center gap-14">
              {testimonials.slice(i * 3, i * 3 + 3).map((testimonial, j) => (
                <div
                  key={j}
                  className="w-1/3 p-8 shadow-lg rounded-lg bg-gray-100 transition-transform transform hover:scale-105 hover:shadow-xl text-xl"
                >
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <p className="mt-4 font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index ? "bg-gray-800" : "bg-gray-400"
                  }`}
                ></span>
              ))}
            </div>
    </div>
  );
};

export default Carousel;
