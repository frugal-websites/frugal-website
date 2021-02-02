// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/packages/buttons/src/components/HeadlineOneButton.tsx
import { createBlockStyleButton } from "@draft-js-plugins/buttons"

export const TitleButton = createBlockStyleButton({
  blockType: "header-one",
  children: "Title",
})

export const SubTitleButton = createBlockStyleButton({
  blockType: "header-two",
  children: "SubTitle",
})

export const SubSubTitleButton = createBlockStyleButton({
  blockType: "header-three",
  children: "Sub-SubTitle",
})
