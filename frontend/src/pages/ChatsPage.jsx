import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProviders";
import SideDrawer from "../components/Miscellenous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

function Chats() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();

  return (
    <div style={{ width: "100%" , height:"auto" , display:"inline"}}>
      {user && <SideDrawer />}

      <Box  d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && (
          <MyChats fetchAgain={fetchAgain} />
        )}
        {user && (
          <ChatBox   fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default Chats;
