import Card from "@/components/ui/Card";
import { Post } from "@/types";

interface PostsListProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="
            rounded-2xl 
            hover:scale-105 
            transition-transform duration-300
          "
        >
          <Card
            title={post.title}
            body={post.body}
            href={`/posts/${post.id}`}
          />
        </div>
      ))}
    </div>
  );
}
