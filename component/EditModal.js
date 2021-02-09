import React from "react";
import { View, Text, TextInput } from "react-native";
import { Button, Icon } from "native-base";
import Modal from "react-native-modalbox";
import flatListData from "../data/flatListData";
import { globalStyles } from "../global/style";

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newname: "",
    };
  }
  showEditModal = (editingName, flatlistItem) => {
    // console.log(`editingFood = ${JSON.stringify(editingFood)}`);
    this.setState({
      key: editingName.key,
      newname: editingName.name,
      flatlistItem: flatlistItem,
    });
    this.refs.newModal.open();
  };
  render() {
    return (
      <Modal
        ref={"newModal"}
        style={{
          flex: 1,
          backgroundColor: "#000000aa",
        }}
        position="center"
        backdrop={true}
      >
        <Button
          transparent
          style={globalStyles.closebutton}
          onPress={() => {
            this.refs.newModal.close();
          }}
        >
          <Icon style={globalStyles.closeIcon} name="close" />
        </Button>
        <View style={globalStyles.modalview}>
          <Text style={globalStyles.textbox}>Edit information</Text>
          <TextInput
            style={globalStyles.textinput}
            placeholder="Edit Todo"
            onChangeText={(text) => this.setState({ newname: text })}
          />
          <Button
            style={globalStyles.savebutton}
            onPress={() => {
              if (this.state.newname.length == 0) {
                alert("You must enter name");
                return;
              }
              //Update existing Food
              var foundIndex = flatListData.findIndex(
                (item) => this.state.key == item.key
              );
              if (foundIndex < 0) {
                return; //not found
              }
              flatListData[foundIndex].name = this.state.newname;
              //Refresh flatlist item
              this.state.flatlistItem.refreshFlatListItem();
              this.refs.newModal.close();
            }}
          >
            <Text style={globalStyles.saveBtnText}>Save</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

export default EditModal;
