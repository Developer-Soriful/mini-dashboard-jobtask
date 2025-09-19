import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/Card";
import { Post } from "@/types";

interface PostsListProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <Card
              title={post.title}
              body={post.body}
              href={`/posts/${post.id}`}
              className="hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
