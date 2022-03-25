<template>
  <h1>Basic Example</h1>
  <QuillEditor theme="snow" v-model:content="content" :modules="modules" toolbar="full" />
</template>

<script>
import { ref, defineComponent } from 'vue'
import { Delta, QuillEditor } from '@vueup/vue-quill'

import htmlEditButton from "../../../src/quill.htmlEditButton";
// import htmlEditButton from "quill-html-edit-button";
//     ^ In production use this

export default defineComponent({
  components: {
    QuillEditor,
  },
  setup: () => {
    const modules = {
      name: 'htmlEditButton',
      module: htmlEditButton,
      options: {
        debug: true
      },
    };
    const content = ref(
      new Delta([
        { insert: 'Gandalf', attributes: { bold: true } },
        { insert: ' the ' },
        { insert: 'Grey', attributes: { color: '#ccc' } },
      ])
    )
    return { content, modules }
  },
})
</script>
