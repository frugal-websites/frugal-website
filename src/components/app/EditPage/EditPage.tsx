import React, { useState } from "react"
import { RouteComponentProps } from "@reach/router"
import AppLayout from "../AppLayout/AppLayout"
import SideBar, { ISectionValue } from "../../common/SideBar/SideBar"
import { MoveToInbox as InboxIcon } from "@material-ui/icons"
import { Box } from "@material-ui/core"
import RichTextEditor from "../RichTextEditor/RichTextEditor"
import EditContentSection from "../EditContentSection/EditContentSection"

interface IEditPageProps extends RouteComponentProps {}

const sections: ISectionValue[] = [
  { name: `Content`, icon: <InboxIcon /> },
  { name: `Style`, icon: <InboxIcon /> },
  { name: `Settings`, icon: <InboxIcon /> },
]

const EditPage: React.FunctionComponent<IEditPageProps> = (
  props: IEditPageProps
) => {
  const [activeSection, setActiveSection] = useState("Content")

  const onSectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    sectionName: string
  ) => {
    setActiveSection(sectionName)
  }

  return (
    <AppLayout>
      <SideBar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={onSectionClick}
      >
        <Box>
          {activeSection && activeSection === `Content` && (
            <EditContentSection />
          )}
          {activeSection && activeSection === `Style` && (
            <h1>Welcome to Style section.</h1>
          )}
          {activeSection && activeSection === `Settings` && (
            <h1>Welcome to Settings section.</h1>
          )}
        </Box>
      </SideBar>
    </AppLayout>
  )
}
export default EditPage
