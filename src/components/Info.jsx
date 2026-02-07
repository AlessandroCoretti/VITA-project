import { motion } from "framer-motion";

export default function InfoSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const galleryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="flex flex-col items-center gap-6 w-[80%] mx-auto mb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center gap-3"
      >
        <motion.h4 variants={itemVariants} className="raleway text-sm text-amber-800 tracking-widest">
          COSA VI ASPETTA
        </motion.h4>

        <motion.h2 variants={itemVariants} className="playfair-display text-5xl text-center">
          Un luogo pieno di <strong className="font-light">VITA</strong>
        </motion.h2>

        <motion.p variants={itemVariants} className="dm-sans text-lg text-center max-w-3xl">
          Vita ti accoglie con un’atmosfera calda e sincera, fatta di sorrisi, incontri e momenti da condividere. È il luogo dove le persone diventano amici e
          ogni istante ha il sapore di qualcosa di vero. Qui non entri solo per fermarti un attimo, ma per sentirti parte di qualcosa. Non è semplicemente un
          posto dove stare: qui non ti senti come a casa, qui sei a casa.
        </motion.p>
      </motion.div>

      {/* GALLERY */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-3 grid-rows-2 gap-4 w-full"
      >
        <motion.div variants={galleryVariants} className="col-span-2 row-span-2">
          <img
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1169&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>

        <motion.div variants={galleryVariants} className="row-span-1">
          <img
            src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=1170&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>

        <motion.div variants={galleryVariants} className="row-span-1">
          <img
            src="https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1170&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
