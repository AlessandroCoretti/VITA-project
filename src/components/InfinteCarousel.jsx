import { motion } from "framer-motion";

export default function InfiniteCarousel() {
  const menuInfo = [
    {
      id: 1,
      title: "IL BUONGIORNO SI VEDE DAL MATTINO",
      photo: "https://images.unsplash.com/photo-1763647872237-c76e660cf38b?q=80&w=1165&auto=format&fit=crop",
      text: "Colazioni calde, lente e felici.",
    },
    {
      id: 2,
      title: "FAI LA TUA PAUSA, RESPIRA, VIVI",
      photo: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?q=80&w=1074&auto=format&fit=crop",
      text: "Il tempo giusto per fermarsi.",
    },
    {
      id: 3,
      title: "LA MERITATA RICOMPENSA",
      photo: "https://images.unsplash.com/photo-1621873495884-845a939892d1?q=80&w=1170&auto=format&fit=crop",
      text: "Aperitivi che sanno di sera.",
    },
  ];

  // duplico i contenuti
  const items = [...menuInfo, ...menuInfo];

  return (
    <section className="overflow-hidden w-full py-20">
      <motion.div
        className="flex gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-87.5 shrink-0 bg-white rounded-lg overflow-hidden shadow-md">
            <img src={item.photo} alt={item.title} className="h-56 w-full object-cover" />
            <div className="p-4">
              <h3 className="playfair-display text-xl mb-2">{item.title}</h3>
              <p className="dm-sans text-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
