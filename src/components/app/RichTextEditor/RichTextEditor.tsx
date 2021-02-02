import React, { useState, useEffect, Fragment } from "react"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box, Button } from "@material-ui/core"
import buttonStyles from "./buttonStyles.module.scss"

import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from "draft-js"

import Editor from "@draft-js-plugins/editor"

import createToolbarPlugin from "@draft-js-plugins/static-toolbar"

import createLinkPlugin from "@draft-js-plugins/anchor"

import { LinkifyPluginTheme } from "@draft-js-plugins/linkify/lib/theme"
import createLinkifyPlugin from "@draft-js-plugins/linkify"

import editorStyles from "./editorStyles.module.scss"
import toolbarStyles from "./toolbarStyles.module.scss"
import linkStyles from "./linkStyles.module.scss"
import linkifyStyles from "./linkifyStyles.module.scss"

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  // HeadlineOneButton,
  // HeadlineTwoButton,
  // HeadlineThreeButton,
  // CodeButton,
  // CodeBlockButton,
  // AlignBlockDefaultButton,
  // AlignBlockCenterButton,
  // AlignBlockLeftButton,
  // AlignBlockRightButton,
  // SubButton,
  // SupButton,
  createBlockStyleButton,
} from "@draft-js-plugins/buttons"
import _ from "lodash"
import { SubSubTitleButton, SubTitleButton, TitleButton } from "./CustomButtons"

// TODO
// - add other options (headers link etc)
// - see format of received content
// - finish css (pale + size take full width and height of parent div)
// - pass as prop default message
// - link to hook-form

const staticToolbarPlugin = createToolbarPlugin({
  // @ts-ignore
  theme: { buttonStyles, toolbarStyles },
})
const { Toolbar } = staticToolbarPlugin

const linkPlugin = createLinkPlugin({
  // TODO FIX THIS ERROR
  theme: {
    input: linkStyles.input,
    link: linkStyles.link,
    inputInvalid: linkStyles.inputInvalid,
  },
  placeholder: "http://…",
})

const linkifyPlugin = createLinkifyPlugin({
  target: "_blank",
  theme: { link: linkifyStyles.link } as LinkifyPluginTheme,
})

// TODO move inside Functional Component : https://github.com/draft-js-plugins/draft-js-plugins/issues/1244
const plugins = [staticToolbarPlugin, linkifyPlugin, linkPlugin] // , linkPlugin

// TODO https://www.npmjs.com/package/draft-js:  Because Draft.js supports unicode, you must have the following meta tag in the <head> </head> block of your HTML file:

interface IRichTextEditorProps {
  formEditorState: string
  formOnChange: (value: string) => void
}

const RichTextEditor: React.FunctionComponent<IRichTextEditorProps> = (
  props: IRichTextEditorProps
) => {
  const [isFirstRender, setIsFirstRender] = useState(true)

  // TODO maybe no need for getInitialEditorState() here
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  // TODO try to remove this and keep source if needed in future
  const [remountKey, setRemountKey] = useState(1)

  useEffect(() => {
    // TODO: review this might be problematic
    // See source: https://github.com/draft-js-plugins/draft-js-plugins/issues/982
    // https://github.com/draft-js-plugins/draft-js-plugins/issues/491
    if (editorState && !editorState.getDecorator()) {
      console.log("editorState && !editorState.getDecorator()")
      const newValue = remountKey + 1
      setRemountKey(newValue)
    }
  }, [editorState])

  useEffect(() => {
    // TODO: review this might be problematic
    if (props.formEditorState && isFirstRender) {
      const decorators = _.flattenDeep(
        plugins.map(plugin => plugin.decorators).filter(item => item)
      )
      const decorator = new CompositeDecorator(
        // @ts-ignore
        decorators.filter((decorator, index) => index !== 1)
      )

      if (props.formEditorState) {
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(props.formEditorState)),
            decorator
          )
        )
      }
      setIsFirstRender(false)
    }
  }, [props.formEditorState])

  // See Dynamic focus of https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering
  const onChange = (value: EditorState): void => {
    setEditorState(value)

    const formEditorState: string = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    )

    if (props.formOnChange) {
      props.formOnChange(formEditorState)
    }
  }

  return (
    <div>
      <div className={editorStyles.editor}>
        <Editor
          key={remountKey}
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
        />
        {/* <Box className={classes.toolbar}> */}
        <Toolbar>
          {externalProps => (
            <Fragment>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <linkPlugin.LinkButton {...externalProps} />
              <TitleButton {...externalProps} />
              <SubTitleButton {...externalProps} />
              <SubSubTitleButton {...externalProps} />
            </Fragment>
          )}
        </Toolbar>
        {/* </Box> */}
      </div>

      {/* <Button
        variant="outlined"
        onClick={() => {
          console.log(
            JSON.stringify(
              convertToRaw(editorState.getCurrentContent()),
              null,
              4
            )
          )
        }}
      >
        Log Editor State
      </Button> */}
    </div>
  )
}

export default RichTextEditor
