interface CarouselProps {
    testimonials: { quote: string; author: string }[];
    index: number;
}

const Carousel = ({ testimonials, index }: CarouselProps) => {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out snap-x snap-mandatory"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {/* Chia testimonials thành các nhóm 3 phần tử */}
        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
          (_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row p-4 min-w-full justify-center gap-6 md:gap-14 snap-center"
            >
              {testimonials.slice(i * 3, i * 3 + 3).map((testimonial, j) => (
                <div
                  key={j}
                  className="w-full md:w-1/3 p-6 sm:p-8 shadow-lg rounded-lg bg-gray-100 transition-transform transform md:hover:scale-105 hover:shadow-xl text-lg sm:text-xl"
                >
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <p className="mt-4 font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Chấm phân */}
      <div className="p-2 mt-6 flex justify-center space-x-3">
        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
          (_, i) => (
            <span
              key={i}
              className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                i === index ? "bg-gray-900 scale-110" : "bg-gray-400"
              }`}
            ></span>
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
