import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS, FONTS } from '../enums/StyleEnums';

const CalendarModal = (props: any) => {
  const { visible, onClose, onDateSelect } = props;
  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Calendar
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: COLORS.primary,
              selectedDayTextColor: COLORS.white,
              todayTextColor: COLORS.primary,
              dayTextColor: '#2d4150',
              textDisabledColor: "#C7C7C7"
            }}
            minDate={today}
            onDayPress={(day) => {
              onDateSelect(day.dateString);
              onClose(); // Close modal after selecting
            }}
          />
          <TouchableOpacity onPress={onClose} 
          style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeText:{
    fontFamily:FONTS.semibold,
    fontSize:15,
    color:COLORS.white
  },
  closeButton:{
    height:40,
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLORS.primary,
    borderRadius:10
  }
});
