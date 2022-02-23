import React from 'react';
import { StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import checkedBox from '../../../../Images/checked-checkbox.png';
import uncheckedBox from '../../../../Images/empty-checkbox.png';

export const styles = StyleSheet.create({
  pdf: {
    width: '1200px',
    height: '600px',
  },
  checkboxLabel: {
    paddingLeft: '5px',
  },
  checkbox: {
    width: '13px',
    height: '13px',
  },
  subheadingInfo: {
    fontSize: '14px',
    fontStyle: 'italic',
    paddingLeft: '20px',
    paddingBottom: '5px',
    backgroundColor: 'rgba(219, 220, 223, 0.452)',
    borderRadius: '5px',
  },
  sectionSubHeading: {
    fontSize: '15px',
    color: 'grey',
    fontStyle: 'italic',
    paddingLeft: '20px',
    paddingVertical: '5px',
    backgroundColor: 'rgb(219, 220, 223, 0.452)',
    borderRadius: '5px',
  },
  sectionLeft: {
    width: '40%',
    textAlign: 'right',
    paddingRight: '5%',
    fontWeight: '800',
  },
  sectionRight: {
    width: '60%',
    paddingLeft: '3%',
    display: 'flex',
    flexDirection: 'row',
  },
  page: {
    paddingHorizontal: '20px',
    paddingVertical: '25px',
  },
  PDFHeading: {
    textAlign: 'center',
    fontWeight: 1000,
    fontSize: '30px',
    padding: '3px',
  },
  sectionHeading: {
    fontSize: '16px',
    fontWeight: 500,
    backgroundColor: 'rgb(199, 228, 94)',
    padding: '3px',
    borderRadius: '5px',
  },
  sectionField: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: '7px',
    fontSize: '13px',
  },
});

export const ViewElement = ({ title, body }) => (
  <View style={styles.sectionField}>
    <Text style={styles.sectionLeft}>{title}: </Text>
    <Text style={styles.sectionRight}> {body} </Text>
  </View>
);

export const SectionHeading = ({ title }) => <Text style={styles.sectionHeading}>{title} :</Text>;

export const SectionSubHeading = ({ title }) => <Text style={styles.sectionSubHeading}>{title}</Text>;

export const SubheadingInfo = ({ title }) => <Text style={styles.subheadingInfo}>{title} -</Text>;

export const CheckedCheckbox = () => <Image style={styles.checkbox} src={checkedBox} cache />;

export const EmptyCheckbox = () => <Image style={styles.checkbox} src={uncheckedBox} cache />;

export const CourseCheckbox = ({ title, checked }) => (
  <View style={styles.sectionField}>
    <Text style={styles.sectionLeft}>{title} :</Text>
    <View style={styles.sectionRight}>{checked ? <CheckedCheckbox /> : <EmptyCheckbox />}</View>
  </View>
);

export const LabeledCheckbox = ({ label, checked }) => (
  <View style={styles.sectionRight}>
    {checked ? <CheckedCheckbox /> : <EmptyCheckbox />}
    <Text style={styles.checkboxLabel}>{label}</Text>
  </View>
);

export const EligibleBranchList = ({ allBranch, eligibleBranch }) => (
  <View>
    {allBranch.map((branch) => {
      const res = eligibleBranch.includes(branch);
      return <CourseCheckbox key={branch} title={branch} checked={res} />;
    })}
  </View>
);

export const EligibleBranchBox = ({ heading, subHeading, ...otherProps }) => (
  <View>
    <SectionSubHeading title={heading} />
    <SubheadingInfo title={subHeading} />
    <EligibleBranchList {...otherProps} />
  </View>
);
