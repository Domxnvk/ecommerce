"use client";

import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { ProductShowcase } from "@/types/product-showcase";

interface ProductShowcaseCardProps {
  product: ProductShowcase;
  index: number;
  className?: string;
}

export const ProductShowcaseCard = ({
  product,
  index,
  className = "",
}: ProductShowcaseCardProps) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (product.buttonAction === "start-design") {
      router.push("/create");
    }
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotateY: index % 2 === 0 ? -20 : 20,
        filter: "blur(8px)",
      }}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: "backOut",
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ margin: "-30px" }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.4 },
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        filter: "blur(0px)",
      }}
    >
      <Card className="h-[300px] hover:scale-[1.02] transition-transform duration-300">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {product.category}
          </p>
          <h4 className="text-white font-medium text-large">{product.title}</h4>
        </CardHeader>

        {product.user && (
          <div className="absolute top-3 right-3 z-20">
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="group cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm border-2 border-white/80 shadow-lg rounded-full flex items-center justify-center text-lg">
                {product.user.avatar}
              </div>
              <div className="absolute -bottom-8 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                by {product.user.name}
              </div>
            </motion.div>
          </div>
        )}

        <Image
          removeWrapper
          alt={product.title}
          className="z-0 w-full h-full object-cover"
          src={product.image}
        />

        {product.buttonText && (
          <CardFooter className="absolute bottom-0 z-10 justify-end">
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              radius="full"
              size="sm"
              onPress={handleButtonClick}
            >
              {product.buttonText}
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};
