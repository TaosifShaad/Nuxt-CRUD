<template>
  <div class="min-h-screen">
    <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
      <!-- Page title -->
      <h1 class="text-2xl font-medium">Authors</h1>
      <p class="mt-2 text-sm text-gray-500">Manage your authors here</p>

      <div
          class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
      >
        <div class="relative w-full md:mr-10 grow">
					<span class="absolute -translate-y-1/2 top-1/2 left-3">
						<Icon name="ep:search" size="24" class="text-gray-400" />
					</span>
          <input
              placeholder="Search author..."
              v-model="search"
              type="search"
              name="search"
              id="search"
              class="pl-11 input"
          />
        </div>
        <button
            @click="authorModal.openModal()"
            class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
        >
          Add Author
        </button>
      </div>

      <div class="relative mt-5 mb-20 border border-gray-100 rounded-lg">
        <ClientOnly fallback-tag="p" fallback='Loading Authors...' class="text-center text-purple-400 text-lg py-[10%]">
          <EasyDataTable
              empty-message="No Author Found"
              :search-value="search"
              theme-color="#f97316"
              table-class-name="eztble"
              :headers="headers"
              :items="authorStore.authors"
              show-index
          >
            <!-- Show authors  -->
            <template #item-name="{ name }">
              <span class="font-semibold">{{ name }}</span>
            </template>
            <template #item-books="{ name }">
              <span v-if="booksOfAuthors(name).length" v-for="(book, index) in booksOfAuthors(name)">{{ index == booksOfAuthors(name).length -1? book : book + ', ' }} </span>
              <span v-else class="text-red-500 font-bold "> <i>No books added for this author.</i></span>
            </template>
            <!-- Action items for table -->
            <template #item-actions="author">
              <div class="flex space-x-4 text-gray-500">
                <button @click="authorModal.openModal(author)" class="hover:text-green-500 transition-colors">
                  <Icon v-tooltip="'Edit'" size="18" name="fluent:pen-24-regular" class="outline-none" />
                </button>
                <button @click="removeAuthor(author)" class="hover:text-red-500 transition-colors">
                  <Icon v-tooltip="'Delete'" size="18" name="fluent:delete-24-regular" />
                </button>
              </div>
            </template>
          </EasyDataTable>
        </ClientOnly>
      </div>
    </main>
    <!-- Author modal comp -->
    <AuthorModal ref="authorModal" />
  </div>
</template>

<script setup lang="ts">
import { Header } from "vue3-easy-data-table";
import Swal from 'sweetalert2';

// Author store
const authorStore = useAuthorStore();
const bookStore = useBookStore();

const books = await bookStore.getAll();
// console.log(books[0].authors[0].name);
// const authorData = books.map((el) => el.authors.filter((elem) => elem.name == 'abcd'));
function booksOfAuthors(authorName) {
  let arr = [];
  books.forEach((el) => {
    el.authors.forEach(author => {
      if (author.name == authorName) {
        arr.push(el.title);
        return
      }
    });
  })
  return arr;
}
// const authorData = books.filter(el => el.authors[0].name == 'abcd');
// console.log(authorData);
// get data on page load
useAsyncData(async () => await authorStore.getAll(), {
  initialCache: false,
});

// Modal ref
const authorModal = ref();
//Search for author in table
const search = ref("");
// Method used to remove an author
const removeAuthor = (author) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      authorStore.remove(author._id);
      Swal.fire(
          'Deleted!',
          'Your author has been deleted.',
          'success'
      )
    } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {}
  });
};

// Table headers
const headers: Header[] = [
  { text: "Author Name", value: "name", sortable: true },
  { text: "Books", value: "books"},
  { text: "Actions", value: "actions", width: 100 },
];
</script>