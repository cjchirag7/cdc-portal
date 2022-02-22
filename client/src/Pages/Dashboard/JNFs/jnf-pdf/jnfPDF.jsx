import React from 'react';
import { PDFViewer, Page, Text, View, Document, Link } from '@react-pdf/renderer';
import {
  ViewElement,
  SectionHeading,
  SectionSubHeading,
  LabeledCheckbox,
  EligibleBranchBox,
  styles,
} from './jnfPdfField';

import {
  btechBranches,
  dualDegreeBranches,
  skillBased,
  mscTechBranches,
  mtechBranches,
  mbaBranches,
  mscBranches,
  phdBranches,
  typeOfTest,
  otherQualificationRounds,
} from '../data';
import { JNF_FORM_DATA } from '../../../../store/DATA';

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.PDFHeading}>JOB NOTIFICATION FORM</Text>
        <View>
          <SectionHeading title="Company Overview" />
          <ViewElement title="Name" body="Zomato" />
          <View style={styles.sectionField}>
            <Text style={styles.sectionLeft}>Website: </Text>
            <Link src="www.zomato.com" style={styles.sectionRight}>
              www.zomato.com
            </Link>
          </View>
          <ViewElement title="Category" body="IT" />
        </View>
        <View>
          <SectionHeading title="Job Details" />
          <ViewElement title="Designation" body="SDE" />
          <ViewElement title="Place of posting" body="Delhi" />
          <ViewElement
            title="Job description"
            body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, consequuntur."
          />
        </View>
        <View>
          <SectionHeading title="Salary Details" />
          <ViewElement title="CTC (in LPA)" body="25" />
          <ViewElement title="CTC Breakup" body="Lorem ipsum dolor sit amet." />
          <ViewElement title="Bond Details (If any)" body="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
        </View>
        <View>
          <SectionHeading title="Contact person details" />
          <SectionSubHeading title="Primary Contact" />
          <ViewElement title="Name" body="Lorem, ipsum dolor." />
          <ViewElement title="Designation" body="HR" />
          <ViewElement title="Email Address" body="example@gmail.com" />
          <ViewElement title="Mobile Number" body="8575456321" />
          <SectionSubHeading title="Secondary Contact (if any)" />
          <ViewElement title="Name" body="Lorem, ipsum dolor." />
          <ViewElement title="Designation" body="HR" />
          <ViewElement title="Email Address" body="example@gmail.com" />
          <ViewElement title="Mobile Number" body="8575456321" />
        </View>
        <View>
          <SectionHeading title="Eligible courses & Disciplines" />
          <EligibleBranchBox
            heading="4-Year B. Tech Programs"
            subHeading="Admitted through JEE (Advanced)"
            allBranch={btechBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['4year']}
          />
          <EligibleBranchBox
            heading="5-Year Dual Degree/ Integrated M. Tech Programs"
            subHeading="Admitted through JEE (Advanced)"
            allBranch={dualDegreeBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['5year']}
          />
          <EligibleBranchBox
            heading="Skill Based Hiring"
            subHeading=" Students with certified technical expertise in the following skills (from Coursera, Udemy etc.)"
            allBranch={skillBased}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['skill-based']}
          />
          <EligibleBranchBox
            heading="3-Year MSc. Tech Programs"
            subHeading="Admitted through JAM"
            allBranch={mscTechBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses'].jam}
          />
          <EligibleBranchBox
            heading="2-Year M. Tech Programs"
            subHeading="Admitted through GATE"
            allBranch={mtechBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['2-year-mtech']}
          />
          <EligibleBranchBox
            heading="2-Year MBA Programs"
            subHeading="Admitted through CAT"
            allBranch={mbaBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['2-year-mba']}
          />
          <EligibleBranchBox
            heading="2-Year M.Sc. Programs"
            subHeading="Admitted through JAM"
            allBranch={mscBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses']['2-year msc']}
          />
          <EligibleBranchBox
            heading="PhD Programs"
            subHeading="Admitted through GATE/NET"
            allBranch={phdBranches}
            eligibleBranch={JNF_FORM_DATA['eligible-courses'].phd}
          />
        </View>
        <View>
          <SectionHeading title="Selection Procedure" />
          <View style={styles.sectionField}>
            <Text style={styles.sectionLeft}>Resume Shortlisting :</Text>
            <View style={styles.sectionRight}>
              <LabeledCheckbox label="Yes" checked={JNF_FORM_DATA['selection-procedure']['Resume Shortlisting']} />
              <LabeledCheckbox label="No" checked={!JNF_FORM_DATA['selection-procedure']['Resume Shortlisting']} />
            </View>
          </View>
          <View style={styles.sectionField}>
            <Text style={styles.sectionLeft}>Type of test :</Text>
            <View style={styles.sectionRight}>
              {typeOfTest.map((type) => {
                return type === JNF_FORM_DATA['selection-procedure']['Type of Test'] ? (
                  <LabeledCheckbox key={type} label={type} checked />
                ) : (
                  <LabeledCheckbox key={type} label={type} />
                );
              })}
            </View>
          </View>
          <View style={styles.sectionField}>
            <Text style={styles.sectionLeft}>Total number of rounds :</Text>
            <View style={styles.sectionRight}>
              {otherQualificationRounds.map((round) => {
                return JNF_FORM_DATA['selection-procedure']['other-qualification-rounds'].includes(round) ? (
                  <LabeledCheckbox key={round} label={round} checked />
                ) : (
                  <LabeledCheckbox key={round} label={round} />
                );
              })}
            </View>
          </View>
          <ViewElement title="Total number of rounds" body="3" />
          <ViewElement
            title="Number of offers available for IIT(ISM) students (Range would be sufficient)"
            body="20-25"
          />
          <ViewElement
            title="Eligibility Criteria (if any)"
            body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, possimus."
          />
        </View>
      </View>
    </Page>
  </Document>
);

const JNF_PDF = () => {
  return (
    <PDFViewer style={styles.pdf}>
      <MyDocument />
    </PDFViewer>
  );
};

export default JNF_PDF;
