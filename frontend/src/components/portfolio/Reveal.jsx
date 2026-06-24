import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const VARIANTS = {
  ember: {
    hidden: { y: 80, opacity: 0, scale: 0.95, filter: 'blur(8px)' },
    visible: { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  terminal: {
    hidden: { x: -40, opacity: 0, skewX: -2 },
    visible: { x: 0, opacity: 1, skewX: 0 },
  },
  glitch: {
    hidden: { x: -15, opacity: 0, skewX: -5, scaleX: 0.92 },
    visible: { x: 0, opacity: 1, skewX: 0, scaleX: 1 },
  },
  beam: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { clipPath: 'inset(0 0% 0 0)' },
  },
  hologram: {
    hidden: { scale: 0.6, rotateX: 20, rotateY: -10, opacity: 0 },
    visible: { scale: 1, rotateX: 0, rotateY: 0, opacity: 1 },
  },
  float: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
};

const STAGGER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Reveal({ children, variant = 'ember', delay = 0, duration = 0.8, once = false, amount = 0.2, className, style, as: Tag = 'div', ...props }) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={VARIANTS[variant] || VARIANTS.ember}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

function Group({ children, stagger = 0.08, once = false, amount = 0.15, className, style, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function Item({ children, variant = 'float', delay = 0, duration = 0.7, className, style, ...props }) {
  return (
    <motion.div
      variants={VARIANTS[variant] || VARIANTS.float}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

Reveal.Group = Group;
Reveal.Item = Item;
