"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import BackgroundDots from "./BackgroundDots";
import PropertyPage from "@/app/property/page";
import PropertySearch from "../PropertySearch";
import { motion } from "framer-motion";

const sentence = "Where Dream Homes Get Delivered".split(" ");

const Hero = () => {
  // const session=await auth();
  // if(!session.user){
  //   redirect("/");
  // }

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <BackgroundDots className="absolute left-0 top-0 z-0 h-full w-full" />

        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <motion.h1
                  className="mb-5 flex gap-4 text-center text-3xl font-bold leading-tight text-black dark:text-white sm:text-3xl sm:leading-tight  md:text-5xl md:leading-tight"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2, // Delay between words
                      },
                    },
                  }}
                >
                  {sentence.map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      variants={{
                        hidden: { y: 10, opacity: 0 },
                        visible: {
                          y: [10, -5, 0],
                          opacity: 1,
                          transition: { duration: 0.5 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
            </div>
          </div>
        </div>

        <PropertySearch />
      </section>
    </>
  );
};

export default Hero;
