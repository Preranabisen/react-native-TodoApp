import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";

import { Container, Header, Body, Title } from "native-base";

import flatListData from "./data/flatListData";
import AddModal from "./component/AddModal";
import EditModal from "./component/EditModal";
import FlatListItem from "./component/FlatListItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null, //intialized the state
      refreshing: false,
    };
    this.onPressAdd = this.onPressAdd.bind(this);
  }
  onPressAdd() {
    this.refs.addModal.showAddModal();
  }
  refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: activeKey,
      };
    });
    this.refs.flatList.scrollToEnd();
  };

  _onRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        setTimeout(() => {
          this.setState({ refreshing: false });
        }, 2000);
      }
    );
  };
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Container>
          <View style={{ flex: 1 }}>
            <Header>
              <Body style={{ alignItems: "center" }}>
                <Title>Todo App</Title>
              </Body>
            </Header>
            <TouchableOpacity onPress={this.onPressAdd} style={styles.button}>
              <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>

            <FlatList
              ref={"flatList"}
              data={flatListData}
              renderItem={({ item, index }) => {
                return (
                  <FlatListItem
                    item={item}
                    index={index}
                    parentFlatList={this}
                  ></FlatListItem>
                );
              }}
            ></FlatList>

            <AddModal ref={"addModal"} parentFlatList={this}></AddModal>
            <EditModal ref={"editModal"} parentFlatList={this}></EditModal>
          </View>
        </Container>
      </ScrollView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginLeft: 20,
    marginTop: 20,
    width: 120,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
