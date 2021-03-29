import React, { useState, useEffect, Fragment } from "react"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Box, Button } from "@material-ui/core"

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

// @ts-ignore
import buttonStyles from "./buttonStyles.module.scss"
// @ts-ignore
import editorStyles from "./editorStyles.module.scss"
// @ts-ignore
import toolbarStyles from "./toolbarStyles.module.scss"
// @ts-ignore
import linkStyles from "./linkStyles.module.scss"
// @ts-ignore
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

// TODO move inside Functional Component : https://github.com/draft-js-plugins/draft-js-plugins/issues/1244
//const plugins = [staticToolbarPlugin, linkifyPlugin] // , linkPlugin

// TODO https://www.npmjs.com/package/draft-js:  Because Draft.js supports unicode, you must have the following meta tag in the <head> </head> block of your HTML file:

// remountKey solution when loosing decorators
// See source: https://github.com/draft-js-plugins/draft-js-plugins/issues/982
// https://github.com/draft-js-plugins/draft-js-plugins/issues/491

interface IRichTextEditorProps {
  formEditorState: string
  formOnChange: (value: string) => void
}

const RichTextEditor: React.FunctionComponent<IRichTextEditorProps> = (
  props: IRichTextEditorProps
) => {
  const [{ plugins, Toolbar }] = useState(() => {
    const staticToolbarPlugin = createToolbarPlugin({
      // @ts-ignore
      theme: { buttonStyles, toolbarStyles },
    })

    const linkPlugin = createLinkPlugin({
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
    const { Toolbar } = staticToolbarPlugin
    const plugins = [staticToolbarPlugin, linkifyPlugin] // linkPlugin
    return {
      plugins,
      Toolbar,
    }
  })

  const [isFirstRender, setIsFirstRender] = useState(true)

  // TODO maybe no need for getInitialEditorState() here
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    // TODO: review this might be problematic
    if (props.formEditorState && isFirstRender) {
      const decorators = _.flattenDeep(
        plugins.map(plugin => plugin.decorators).filter(item => item)
      )
      console.log("decorators", decorators)
      const decorator = new CompositeDecorator(
        // @ts-ignore
        decorators
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
              {/* <linkPlugin.LinkButton {...externalProps} /> */}
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
