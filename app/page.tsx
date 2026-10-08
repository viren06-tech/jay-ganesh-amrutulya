"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Star,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  {
    name: "Special Basundi Chai",
    price: "₹25",
    image: "/products/basundi-chai.jpg",
    special: true,
  },
  {
    name: "Tea",
    price: "₹15",
    image: "/products/tea.jpg",
  },
  {
    name: "Coffee",
    price: "₹25",
    image: "/products/coffee.jpg",
  },
  {
    name: "Milk",
    price: "₹25",
    image: "/products/milk.jpg",
  },
  {
    name: "Boost",
    price: "₹25",
    image: "/products/boost.jpg",
  },
  {
    name: "Bun Maska",
    price: "₹25",
    image: "/products/bun-maska.jpg",
  },
  {
    name: "Bread Roll",
    price: "₹20",
    image: "/products/bread-roll.jpg",
  },
  {
    name: "Cream Roll",
    price: "₹12",
    image: "/products/cream-roll.jpg",
  },
  {
    name: "Biscuit",
    price: "₹5",
    image: "/products/biscuit.jpg",
  },
  {
    name: "Cake Toast",
    price: "₹5",
    image: "/products/cake-toast.jpg",
  },
  {
    name: "Cold Drinks",
    price: "As per MRP",
    image: "/products/cold-drinks.jpg",
  },
];

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Owners", "owners"],
  ["Menu", "menu"],
  ["Gallery", "gallery"],
  ["Location", "location"],
  ["Contact", "contact"],
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#080706] text-white">
      {/* ========================= NAVBAR ========================= */}
<nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

    {/* Brand / Admin Login */}
    <Link
      href="/admin/login"
      aria-label="Admin Login"
      className="group flex items-center gap-3"
    >
      <img
        src="/logo.png"
        alt="जय गणेश अमृततुल्य"
        className="h-11 w-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div>
        <p className="text-sm font-bold tracking-wide text-[#f5b942] transition-colors group-hover:text-[#ffd166]">
          जय गणेश
        </p>

        <p className="text-xs text-white/60 transition-colors group-hover:text-white/80">
          अमृततुल्य
        </p>
      </div>
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden items-center gap-7 md:flex">
      {navItems.map(([label, href]) => (
        <a
          key={href}
          href={`#${href}`}
          className="text-sm text-white/70 transition hover:text-[#f5b942]"
        >
          {label}
        </a>
      ))}

      <a
        href="https://wa.me/918087130117"
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-[#f5b942] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#ffd166]"
      >
        Order / Enquire
      </a>
    </div>

    {/* Mobile Menu Button */}
    <button
      aria-label="Toggle menu"
      className="rounded-lg border border-white/10 p-2 transition hover:border-[#f5b942]/50 hover:text-[#f5b942] md:hidden"
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
    </button>
  </div>

  {/* Mobile Navigation */}
  {mobileOpen && (
    <div className="border-t border-white/10 bg-black/95 px-5 py-5 backdrop-blur-xl md:hidden">
      <div className="flex flex-col gap-4">

        {navItems.map(([label, href]) => (
          <a
            key={href}
            href={`#${href}`}
            onClick={() => setMobileOpen(false)}
            className="text-white/80 transition hover:text-[#f5b942]"
          >
            {label}
          </a>
        ))}

        <a
          href="https://wa.me/918087130117"
          target="_blank"
          rel="noreferrer"
          className="mt-2 rounded-full bg-[#f5b942] px-5 py-3 text-center font-bold text-black transition hover:bg-[#ffd166]"
        >
          Order / Enquire
        </a>

        {/* Admin Login */}
        <Link
          href="/admin/login"
          onClick={() => setMobileOpen(false)}
          className="mt-1 border-t border-white/10 pt-4 text-xs text-white/30 transition hover:text-[#f5b942]"
        >
          Admin Login
        </Link>

      </div>
    </div>
  )}
</nav>

      {/* ========================= HERO ========================= */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(245,185,66,0.18),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#f5b942]/30 bg-[#f5b942]/10 px-4 py-2 text-sm text-[#f5b942]">
              <Star size={15} fill="currentColor" />
              Serving Since 2023
            </div>

            <div className="mb-5">
  {/* Main Business Name */}
  <h1 className="max-w-3xl text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
    <span className="text-[#f5b942]">जय गणेश अमृततुल्य</span>
  </h1>

  {/* Tagline */}
  <p className="mt-4 text-2xl font-bold text-white/90 sm:text-3xl lg:text-4xl">
    एक कप चहा... पिऊन तर पहा..!
  </p>
</div>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              Experience authentic chai, creamy Basundi Chai and your
              favourite tea-time treats at जय गणेश अमृततुल्य.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5b942] px-6 py-3.5 font-bold text-black transition hover:bg-[#ffd166]"
              >
                Explore Menu
                <ArrowRight size={18} />
              </a>

              <a
                href="https://wa.me/918087130117"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-bold transition hover:border-[#f5b942]/50 hover:bg-white/5"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Clock3 size={17} className="text-[#f5b942]" />
                6 AM – 9 PM
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={17} className="text-[#f5b942]" />
                Pimpri-Chinchwad
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute h-72 w-72 rounded-full bg-[#f5b942]/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
              <img
                src="/shop.jpg"
                alt="जय गणेश अमृततुल्य shop"
                className="h-[420px] w-full max-w-[520px] rounded-[1.5rem] object-cover"
              />

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-black/75 p-5 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.25em] text-[#f5b942]">
                  Our Special
                </p>

                <p className="mt-1 text-2xl font-black">
                  Basundi Chai ₹25
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================= ABOUT ========================= */}
      <section id="about" className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5b942]">
                About Us
              </p>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Simple chai.
                <br />
                <span className="text-[#f5b942]">Special moments.</span>
              </h2>
            </div>

            <div className="text-lg leading-8 text-white/65">
              <p>
                Started in 2023, जय गणेश अमृततुल्य brings together the comfort
                of a traditional tea stall with the taste people come back for.
              </p>

              <p className="mt-5">
                Our speciality is our creamy Basundi Chai — made for those who
                want their everyday chai to feel a little more special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= OWNERS ========================= */}
      <section id="owners" className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5b942]">
              Meet the Owners
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              The people behind
              <br />
              <span className="text-[#f5b942]">your favourite chai.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-white/50">
              Built with passion, served with warmth, and dedicated to making
              every chai break a little more special.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Shubham */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#f5b942]/40"
            >
              <div className="relative h-[420px] overflow-hidden bg-[#15110d]">
                <img
                  src="/owners/shubham.jpg"
                  alt="Shubham Vaidyakar"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5b942]">
                    Owner
                  </p>

                  <h3 className="mt-2 text-3xl font-black">
                    Shubham Vaidyakar
                  </h3>
                </div>
              </div>

              <div className="p-7">
                <p className="leading-7 text-white/55">
                  Passionate about creating a welcoming tea experience where
                  every cup is served with quality, warmth, and a personal
                  touch.
                </p>
              </div>
            </motion.div>

            {/* Avinash */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#f5b942]/40"
            >
              <div className="relative h-[420px] overflow-hidden bg-[#15110d]">
                <img
                  src="/owners/avinash.jpg"
                  alt="Avinash Kapare"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f5b942]">
                    Owner
                  </p>

                  <h3 className="mt-2 text-3xl font-black">
                    Avinash Kapare
                  </h3>
                </div>
              </div>

              <div className="p-7">
                <p className="leading-7 text-white/55">
                  Dedicated to maintaining the taste and authenticity of
                  जय गणेश अमृततुल्य while creating a place customers enjoy
                  visiting every day.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================= MENU ========================= */}
<section id="menu" className="bg-[#0d0b09] py-24">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">

    {/* Section Heading */}
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5b942]">
        Our Menu
      </p>

      <h2 className="mt-4 text-4xl font-black sm:text-5xl">
        Something for every chai break
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-white/50">
        Freshly served favourites, from our signature Basundi Chai to
        classic tea-time snacks.
      </p>
    </div>

    {/* ========================= SIGNATURE ITEM ========================= */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative mt-12 overflow-hidden rounded-[2rem] border border-[#f5b942]/40 bg-[#f5b942]/[0.07]"
    >
      <div className="grid lg:grid-cols-2">

        {/* Image */}
        <div className="relative h-[320px] overflow-hidden sm:h-[400px] lg:h-[460px]">
          <img
            src="/products/basundi-chai.jpg"
            alt="Special Basundi Chai"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          <div className="absolute left-5 top-5 rounded-full bg-[#f5b942] px-4 py-2 text-xs font-black uppercase tracking-widest text-black shadow-lg">
            Our Special
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f5b942]">
            Signature Chai
          </p>

          <h3 className="mt-4 text-4xl font-black sm:text-5xl">
            Special
            <br />
            <span className="text-[#f5b942]">Basundi Chai</span>
          </h3>

          <p className="mt-5 max-w-lg text-lg leading-8 text-white/60">
            Our signature creamy chai, made for those who want their
            everyday tea to feel a little more special.
          </p>

          <div className="mt-8 flex items-center gap-5">
            <span className="text-4xl font-black text-[#f5b942]">
              ₹25
            </span>

            <span className="h-8 w-px bg-white/15" />

            <span className="text-sm font-medium text-white/45">
              Must Try
            </span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* ========================= OTHER MENU ITEMS ========================= */}
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {menuItems
        .filter((item) => !item.special)
        .map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#f5b942]/30 hover:bg-white/[0.05]"
          >
            {/* Product Image */}
            <div className="relative h-56 overflow-hidden bg-[#15110d]">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
            </div>

            {/* Product Information */}
            <div className="p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-bold text-white">
                  {item.name}
                </h3>

                <span className="whitespace-nowrap text-lg font-black text-[#f5b942]">
                  {item.price}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
    </div>

    {/* Menu Note */}
    <div className="mt-10 text-center">
      <p className="text-sm text-white/35">
        * Cold drinks available as per MRP.
      </p>
    </div>

  </div>
</section>
      {/* ========================= WHY VISIT US ========================= */}
<section className="relative overflow-hidden py-24">
  <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5b942]/5 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
    {/* Heading */}
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5b942]">
        Why Visit Us
      </p>

      <h2 className="mt-4 text-4xl font-black sm:text-5xl">
        More than just
        <br />
        <span className="text-[#f5b942]">a cup of chai.</span>
      </h2>

      <p className="mt-5 text-lg leading-8 text-white/50">
        At जय गणेश अमृततुल्य, we believe a good cup of chai can make
        an ordinary moment feel special.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {[
        {
          number: "01",
          title: "Freshly Served",
          text: "Hot chai and tea-time favourites prepared and served fresh throughout the day.",
        },
        {
          number: "02",
          title: "Our Signature",
          text: "Our creamy Basundi Chai brings a special twist to your everyday chai experience.",
        },
        {
          number: "03",
          title: "A Place to Relax",
          text: "Drop by for a quick chai break, a snack, or simply a warm moment with friends.",
        },
      ].map((item, index) => (
        <motion.div
          key={item.number}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-[#f5b942]/40 hover:bg-[#f5b942]/[0.04]"
        >
          {/* Number */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-black tracking-widest text-[#f5b942]">
              {item.number}
            </span>

            <span className="h-px w-12 bg-[#f5b942]/30 transition-all duration-300 group-hover:w-20 group-hover:bg-[#f5b942]" />
          </div>

          <h3 className="mt-10 text-2xl font-black">
            {item.title}
          </h3>

          <p className="mt-4 leading-7 text-white/50">
            {item.text}
          </p>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#f5b942] transition-all duration-500 group-hover:w-full" />
        </motion.div>
      ))}
    </div>

    {/* Bottom Brand Statement */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-14 text-center"
    >
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/30">
        एक कप चहा... पिऊन तर पहा..!
      </p>
    </motion.div>
  </div>
</section>

      {/* ========================= GALLERY ========================= */}
<section id="gallery" className="bg-[#0d0b09] py-24">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">

    {/* Heading */}
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5b942]">
        Gallery
      </p>

      <h2 className="mt-4 text-4xl font-black sm:text-5xl">
        A taste of
        <br />
        <span className="text-[#f5b942]">जय गणेश.</span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-white/50">
        A glimpse of our shop and the favourites we serve every day.
      </p>
    </div>

    {/* ========================= MAIN SHOP PHOTO ========================= */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative mt-12 overflow-hidden rounded-[2rem] border border-white/10"
    >
      <img
        src="/shop.jpg"
        alt="जय गणेश अमृततुल्य shop"
        className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-[1.02] sm:h-[480px]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f5b942]">
          Our Place
        </p>

        <h3 className="mt-2 text-2xl font-black sm:text-3xl">
          Welcome to जय गणेश अमृततुल्य
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
          Your neighbourhood spot for chai, snacks and special tea-time
          moments.
        </p>
      </div>
    </motion.div>

    {/* ========================= PRODUCT PHOTOS ========================= */}
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {menuItems
        .filter((item) => item.name !== "Tea")
        .map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-bold text-white">
                  {item.name}
                </p>

                <p className="mt-1 text-xs font-bold text-[#f5b942]">
                  {item.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
    </div>

    {/* Gallery Note */}
    <div className="mt-8 text-center">
      <p className="text-sm text-white/30">
        More photos coming soon.
      </p>
    </div>
  </div>
</section>

     {/* ========================= LOCATION ========================= */}
<section id="location" className="py-24">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <div className="overflow-hidden rounded-[2rem] border border-[#f5b942]/20 bg-[#f5b942]/[0.05]">
      <div className="grid lg:grid-cols-2">

        {/* Left Content */}
        <div className="p-8 sm:p-12 lg:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5b942]">
            Find Us
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            Come over
            <br />
            <span className="text-[#f5b942]">for a cup.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
            Visit जय गणेश अमृततुल्य for a warm cup of chai, our
            signature Basundi Chai and your favourite tea-time treats.
          </p>

          {/* Address */}
          <div className="mt-8 flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5b942]/10">
              <MapPin size={20} className="text-[#f5b942]" />
            </div>

            <div>
              <p className="font-bold">Our Address</p>

              <p className="mt-1 max-w-md leading-7 text-white/50">
                Sant Tukadoji Nagar Colony, near Kalewadi Fata Bus Stop,
                Pimpri-Chinchwad, Maharashtra 411017.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://maps.app.goo.gl/ZMACTbiyGDjnJ1ok6?g_st=ic"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5b942] px-6 py-3.5 font-bold text-black transition hover:bg-[#ffd166]"
            >
              <MapPin size={18} />
              Open in Google Maps
            </a>

            <a
              href="tel:+918087130117"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-bold transition hover:border-[#f5b942]/50 hover:bg-white/5"
            >
              <Phone size={18} />
              Call Us
            </a>
          </div>
        </div>

        {/* Right Information Card */}
        <div className="flex items-center bg-black/30 p-8 sm:p-12 lg:p-14">
          <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">

            {/* Opening Hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5b942]/10">
                <Clock3 size={20} className="text-[#f5b942]" />
              </div>

              <div>
                <p className="font-bold">Opening Hours</p>

                <p className="mt-1 text-white/50">
                  Every Day
                </p>

                <p className="mt-1 font-bold text-[#f5b942]">
                  6:00 AM – 9:00 PM
                </p>
              </div>
            </div>

            <div className="my-7 h-px bg-white/10" />

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5b942]/10">
                <Phone size={20} className="text-[#f5b942]" />
              </div>

              <div>
                <p className="font-bold">Phone / WhatsApp</p>

                <a
                  href="tel:+918087130117"
                  className="mt-1 block text-white/50 transition hover:text-[#f5b942]"
                >
                  +91 80871 30117
                </a>
              </div>
            </div>

            <div className="my-7 h-px bg-white/10" />

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5b942]/10">
                <MapPin size={20} className="text-[#f5b942]" />
              </div>

              <div>
                <p className="font-bold">Location</p>

                <p className="mt-1 text-white/50">
                  Near Kalewadi Fata Bus Stop
                </p>

                <p className="mt-1 text-sm text-white/35">
                  Pimpri-Chinchwad, Maharashtra
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ========================= CONTACT ========================= */}
<section id="contact" className="border-t border-white/5 py-24">
  <div className="mx-auto max-w-6xl px-5 lg:px-8">
    <div className="relative overflow-hidden rounded-[2rem] border border-[#f5b942]/20 bg-[#f5b942]/[0.06] px-7 py-16 text-center sm:px-12">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5b942]/10 blur-3xl" />

      <div className="relative">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f5b942]">
          Contact Us
        </p>

        <h2 className="mt-4 text-4xl font-black sm:text-6xl">
          Chai pe
          <br />
          <span className="text-[#f5b942]">milte hain.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/55">
          Have a question, want to enquire, or simply want to say hello?
          Reach out to जय गणेश अमृततुल्य directly.
        </p>

        {/* Contact Buttons */}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

          {/* WhatsApp */}
          <a
            href="https://wa.me/918087130117"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5b942] px-7 py-4 font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ffd166]"
          >
            <MessageCircle size={19} />
            WhatsApp Us
          </a>

          {/* Call */}
          <a
            href="tel:+918087130117"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-bold transition duration-300 hover:-translate-y-1 hover:border-[#f5b942]/50 hover:bg-white/5"
          >
            <Phone size={19} />
            Call Us
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/jai_ganesh_amrutulya?rpxt=MTVzcmx0NWFuc2hxZg=="
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-bold transition duration-300 hover:-translate-y-1 hover:border-[#f5b942]/50 hover:bg-white/5"
          >
            <span className="text-sm font-black">IG</span>
            Instagram
          </a>
        </div>

        {/* Phone */}
        <div className="mt-9">
          <a
            href="tel:+918087130117"
            className="text-sm text-white/40 transition hover:text-[#f5b942]"
          >
            +91 80871 30117
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* ========================= FOOTER ========================= */}
      <footer className="border-t border-white/10 bg-black py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="जय गणेश अमृततुल्य"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="font-bold">जय गणेश अमृततुल्य</p>

              <p className="text-xs text-white/40">
                एक कप चहा... पिऊन तर पहा..!
              </p>
            </div>
          </div>

          <p className="text-sm text-white/35">
            © 2026 जय गणेश अमृततुल्य. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ========================= FLOATING WHATSAPP ========================= */}
      <a
        href="https://wa.me/918087130117"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
      >
        <MessageCircle size={25} />
      </a>
    </main>
  );
}