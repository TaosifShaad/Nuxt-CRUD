<template>
  <Combobox v-slot="{ open }" multiple>
    <div class="relative">
      <ComboboxLabel class="label">Authors</ComboboxLabel>
      <div class="relative">
        <ComboboxInput
            placeholder="Search here..."
            class="input"
            :displayValue="getDisplay"
            @change="query = $event.target.value"
        />
        <span class="absolute top-2 right-2">
					<ComboboxButton>
						<Icon
                class="transition-all duration-300"
                :class="[open ? 'rotate-180' : '']"
                name="fluent:chevron-down-24-regular"
                size="20"
            /> </ComboboxButton
          ></span>
      </div>
      <ComboboxOptions class="absolute w-full bg-white border border-gray-100 rounded-md shadow-lg">
        <div
            v-if="filteredAuthors.length === 0 && query !== ''"
            class="relative px-2 py-4 text-center text-gray-500 cursor-default select-none"
        >
          No Author Found
        </div>
        <!-- filtereed authors -->
        <ComboboxOption
            as="template"
            v-for="author in filteredAuthors"
            :key="author._id"
            :value="author._id"
        >
          <li
              class="px-3 py-2.5 cursor-pointer ui-active:bg-primary-50 ui-selected:bg-primary ui-selected:text-white"
          >
						<span class="block text-sm truncate ui-active:text-primary">
							{{ author.name }}
						</span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>



<!--  <div class="fixed top-16 w-56 text-right">-->
<!--    <Menu as="div" class="relative inline-block text-left">-->
<!--      <div>-->
<!--        <MenuButton-->
<!--            class="input inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"-->
<!--        >-->
<!--          <input type="text" :value="modelValue"-->
<!--                 @change="$emit('update:modelValue', $event.target.value)"/>-->
<!--          <ChevronDownIcon class="h-6 w-6 text-gray-500" />-->

<!--        </MenuButton>-->
<!--      </div>-->

<!--      <transition-->
<!--          enter-active-class="transition duration-100 ease-out"-->
<!--          enter-from-class="transform scale-95 opacity-0"-->
<!--          enter-to-class="transform scale-100 opacity-100"-->
<!--          leave-active-class="transition duration-75 ease-in"-->
<!--          leave-from-class="transform scale-100 opacity-100"-->
<!--          leave-to-class="transform scale-95 opacity-0"-->
<!--      >-->
<!--        <MenuItems-->
<!--            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"-->
<!--        >-->
<!--          <div class="px-1 py-1">-->
<!--            <MenuItem v-slot="{ active }"-->
<!--                      v-for="author in filteredAuthors"-->
<!--                      :key="author._id"-->
<!--                      :value="author._id"-->
<!--            >-->
<!--              <button-->
<!--                  :class="[-->
<!--                  active ? 'bg-violet-500 text-white' : 'text-gray-900',-->
<!--                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',-->
<!--                ]"-->
<!--              >-->

<!--                {{ author.name }}-->
<!--              </button>-->
<!--            </MenuItem>-->
<!--          </div>-->
<!--        </MenuItems>-->
<!--      </transition>-->
<!--    </Menu>-->
<!--  </div>-->

</template>

<script setup>
import {
  ComboboxLabel,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  Menu, MenuButton, MenuItems, MenuItem
} from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import Input from "~/components/Form/Input.vue";

// instantiate the author store
const authorStore = useAuthorStore();
// get the authors
useAsyncData(() => authorStore.getAll(), { initialCache: false });
// Serch value
const query = ref("");
// Method used to display the text inside the input
const getDisplay = (authors) => {
  // console.log(authors)
  // If empty
  if (!authors.length) return;
  // get first author name
  let firstAuthor = authorStore.authors.find((a) => a._id == authors[0])?.name;
  // if we have more than one selected, return the first & the extras
  if (authors.length > 1) {
    return `${firstAuthor} + ${authors.length - 1} more`;
  }
  // If only one is selcted, return that one
  return firstAuthor;
};
// Simple search function to find the authors
const filteredAuthors = computed(() =>
  // console.log(query.value)
  query.value === ""
      ? authorStore.authors
      : authorStore.authors.filter((a) => {
        return a.name.toLowerCase().includes(query.value.toLowerCase());
    // return query.value
      })
);
</script>