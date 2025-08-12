"use client";

import { CrudPage } from "@/components/shared/crud/crudPage";
import { PostTopic } from "@/lib/types/post";
import {
  getPostTopicsAction,
  createPostTopicAction,
  updatePostTopicAction,
  deletePostTopicAction,
} from "@/lib/actions/postTopic";
import { postTopicSchema } from "@/lib/schemas/posts";

export default function PostTopicsPage() {
  return (
    <CrudPage<PostTopic>
      title="Tópicos de Postagem"
      description="Gerencie os tópicos de postagem cadastrados."
      entityName="Tópico"
      actions={{
        fetch: getPostTopicsAction,
        create: createPostTopicAction,
        update: updatePostTopicAction,
        delete: deletePostTopicAction,
      }}
      schema={postTopicSchema}
    />
  );
}