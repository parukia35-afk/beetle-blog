<template>
  <div v-if="editor" class="tiptap-container">
    <div class="toolbar d-flex flex-wrap pa-2 bg-grey-lighten-4 border-b">
      <v-btn
        v-tooltip="'標題1'"
        icon="mdi-format-header-1"
        variant="text"
        size="small"
        :color="editor.isActive('heading', { level: 1 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      />
      <v-btn
        v-tooltip="'標題2'"
        icon="mdi-format-header-2"
        variant="text"
        size="small"
        :color="editor.isActive('heading', { level: 2 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <v-btn
        v-tooltip="'標題3'"
        icon="mdi-format-header-3"
        variant="text"
        size="small"
        :color="editor.isActive('heading', { level: 3 }) ? 'primary' : ''"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />

      <v-divider vertical class="mx-2" />

      <v-btn
        v-tooltip="'粗體'"
        icon="mdi-format-bold"
        variant="text"
        size="small"
        :color="editor.isActive('bold') ? 'primary' : ''"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <v-btn
        v-tooltip="'斜體'"
        icon="mdi-format-italic"
        variant="text"
        size="small"
        :color="editor.isActive('italic') ? 'primary' : ''"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <v-btn
        v-tooltip="'刪除線'"
        icon="mdi-format-strikethrough"
        variant="text"
        size="small"
        :color="editor.isActive('strike') ? 'primary' : ''"
        @click="editor.chain().focus().toggleStrike().run()"
      />

      <v-divider vertical class="mx-2" />

      <v-btn
        v-tooltip="'項目清單'"
        icon="mdi-format-list-bulleted"
        variant="text"
        size="small"
        :color="editor.isActive('bulletList') ? 'primary' : ''"
        @click="editor.chain().focus().toggleBulletList().run()"
      />

      <v-divider vertical class="mx-2" />

      <v-btn
        v-tooltip="'插入圖片網址'"
        icon="mdi-image-plus"
        variant="text"
        size="small"
        @click="addImage"
      />

      <v-divider vertical class="mx-2" />

      <v-btn
        v-tooltip="'插入表格'"
        icon="mdi-table-plus"
        variant="text"
        size="small"
        @click="editor.chain().focus().insertTable({ rows: 2, cols: 2 }).run()"
      />
      <v-btn
        v-tooltip="'刪除表格'"
        icon="mdi-table-remove"
        variant="text"
        size="small"
        @click="editor.chain().focus().deleteTable().run()"
      />
      <v-divider vertical class="mx-1" />
      <v-btn
        v-tooltip="'刪除此列'"
        icon="mdi-table-row-remove"
        variant="text"
        size="small"
        @click="editor.chain().focus().deleteRow().run()"
      />
      <v-btn
        v-tooltip="'刪除此欄'"
        icon="mdi-table-column-remove"
        variant="text"
        size="small"
        @click="editor.chain().focus().deleteColumn().run()"
      />
      <v-btn
        v-tooltip="'下方加一列'"
        icon="mdi-table-row-plus-after"
        variant="text"
        size="small"
        @click="editor.chain().focus().addRowAfter().run()"
      />

      <v-spacer />

      <v-btn
        icon="mdi-undo"
        variant="text"
        size="small"
        @click="editor.chain().focus().undo().run()"
      />
      <v-btn
        icon="mdi-redo"
        variant="text"
        size="small"
        @click="editor.chain().focus().redo().run()"
      />
    </div>

    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image' // 引入圖片插件

const props = defineProps({
  modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Image // 啟用圖片
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  }
})

// 插入圖片的簡單邏輯 (暫時先用輸入網址的方式測試)
const addImage = () => {
  const url = window.prompt('請輸入圖片網址 (Cloudinary URL)')
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}
</script>

<style lang="scss">
/* 樣式保持不變，但確保包含 img 樣式 */
.tiptap-container {
  .editor-content .ProseMirror {
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1rem auto;
    }
  }
}
</style>
