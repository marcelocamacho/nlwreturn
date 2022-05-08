import { ChatTeardropDots } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { styles } from "./styles";
import { Options } from "../Options";
import { Form } from "../Form";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Success } from "../Success";
import { JumpingTransition } from "react-native-reanimated";

export type FeedbackTypes = keyof typeof feedbackTypes;

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackTypeSelected, setFeedbackTypeSelected] =
    useState<FeedbackTypes | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  function handleOpen() {
    bottomSheetRef.current?.expand();
  }
  function handleRestartFeedback() {
    setFeedbackTypeSelected(null);
    setFeedbackSent(false);
  }
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackTypeSelected ? (
              <Form
                feedbackType={feedbackTypeSelected}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={() => {
                  setFeedbackSent(true);
                }}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackTypeSelected} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
