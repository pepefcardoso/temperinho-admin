"use client";

import { CrudPage } from "@/components/shared/crud/crudPage";
import { PostCategory } from "@/lib/types/post";
import {
  getPostCategoriesAction,
  createPostCategoryAction,
  updatePostCategoryAction,
  deletePostCategoryAction,
} from "@/lib/actions/postCategory";
import { postCategorySchema } from "@/lib/schemas/posts";

export default function PostCategoriesPage() {
  return (
    <CrudPage<PostCategory>
      title="Categorias de Postagem"
      description="Gerencie as categorias de postagem cadastradas."
      entityName="Categoria"
      actions={{
        fetch: getPostCategoriesAction,
        create: createPostCategoryAction,
        update: updatePostCategoryAction,
        delete: deletePostCategoryAction,
      }}
      schema={postCategorySchema}
    />
  );
}