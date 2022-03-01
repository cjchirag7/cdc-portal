import React from 'react';
import { useParams } from 'react-router-dom';
import { PDFViewer, Page, Text, View, Document, Link } from '@react-pdf/renderer';
import {
  ViewElement,
  SectionHeading,
  SectionSubHeading,
  LabeledCheckbox,
  EligibleBranchBox,
  styles,
} from './jnfPdfField';
import MiniSpinner from '../../../../components/common/MiniSpinner';
import showToast from '../../../../utils/showToastNotification';
import { ERROR } from '../../../../store/types';
import * as api from '../../../../api';
import { typeOfTest, otherQualificationRounds } from '../data';

const MyDocument = ({ jnf, courses, coursesLoading }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.PDFHeading}>JOB NOTIFICATION FORM</Text>
          <View>
            <SectionHeading title="Company Overview" />
            <ViewElement title="Name" body={jnf.company?.name} />
            <View style={styles.sectionField}>
              <Text style={styles.sectionLeft}>Website: </Text>
              <Link src={jnf.company?.website} style={styles.sectionRight}>
                {jnf.company?.website}
              </Link>
            </View>
            <ViewElement title="Category" body={jnf.company?.category} />
          </View>
          <View>
            <SectionHeading title="Job Details" />
            <ViewElement title="Designation" body={jnf.jobDesignation} />
            <ViewElement title="Place of posting" body={jnf.postingPlace} />
            <ViewElement title="Job description" body={jnf.jobDesc} />
          </View>
          <View>
            <SectionHeading title="Salary Details" />
            <ViewElement title="CTC (in LPA)" body={jnf.ctc} />
            <ViewElement title="CTC Breakup" body={jnf.ctcBreakup} />
            {jnf.bondDetail && <ViewElement title="Bond Details (If any)" body={jnf.bondDetail} />}
          </View>
          <View>
            <SectionHeading title="Contact person details" />
            <SectionSubHeading title="Primary Contact" />
            <ViewElement title="Name" body={jnf.primaryContact?.name} />
            {jnf.primaryContact?.designation && (
              <ViewElement title="Designation" body={jnf.primaryContact?.designation} />
            )}
            <ViewElement title="Email Address" body={jnf.primaryContact?.email} email />
            {jnf.primaryContact?.phone && <ViewElement title="Mobile Number" body={jnf.primaryContact?.phone} />}
            <SectionSubHeading title="Secondary Contact (if any)" />
            {jnf.secondaryContact?.name && <ViewElement title="Name" body={jnf.secondaryContact.name} />}
            {jnf.secondaryContact?.designation && (
              <ViewElement title="Designation" body={jnf.secondaryContact.designation} />
            )}
            {jnf.secondaryContact?.email && (
              <ViewElement title="Email Address" body={jnf.secondaryContact.email} email />
            )}
            {jnf.secondaryContact?.phone && <ViewElement title="Mobile Number" body={jnf.secondaryContact.phone} />}
          </View>
          <View>
            <SectionHeading title="Eligible courses & Disciplines" />
            {coursesLoading && <MiniSpinner />}
            {!coursesLoading &&
              courses?.map((course, idx) => {
                if (!course) return <></>;
                return (
                  <EligibleBranchBox
                    key={idx}
                    heading={`${course.duration}-Year ${course.name} Programs`}
                    subHeading={`Admitted through ${course.adm_mode}`}
                    allBranch={course.branches}
                    eligibleBranch={jnf.branches}
                  />
                );
              })}
            {jnf.skillsRequired && (
              <EligibleBranchBox
                heading="Skill Based Hiring"
                subHeading=" Students with certified technical expertise in the following skills (from Coursera, Udemy etc.)"
                allBranch={jnf.skillsRequired}
                eligibleBranch={jnf.skillsRequired}
              />
            )}
          </View>
          <View>
            <SectionHeading title="Selection Procedure" />
            <View style={styles.sectionField}>
              <Text style={styles.sectionLeft}>Resume Shortlisting :</Text>
              <View style={styles.sectionRight}>
                <LabeledCheckbox label="Yes" checked={jnf.resume} />
                <LabeledCheckbox label="No" checked={!jnf.resume} />
              </View>
            </View>
            <View style={styles.sectionField}>
              <Text style={styles.sectionLeft}>Type of test :</Text>
              <View style={styles.sectionRight}>
                {typeOfTest.map((type) => {
                  const checked = jnf.testType?.includes(type);
                  return <LabeledCheckbox key={type} label={type} checked={checked} />;
                })}
              </View>
            </View>
            <View style={styles.sectionField}>
              <Text style={styles.sectionLeft}>Total number of rounds :</Text>
              <View style={styles.sectionRight}>
                {otherQualificationRounds.map((type) => {
                  const checked = jnf.otherRound?.includes(type);
                  return <LabeledCheckbox key={type} label={type} checked={checked} />;
                })}
              </View>
            </View>
            <ViewElement title="Total number of rounds" body={jnf.totalRounds} />
            <ViewElement
              title="Number of offers available for IIT(ISM) students (Range would be sufficient)"
              body={jnf.offerRange ? jnf.offerRange : ''}
            />
            <ViewElement title="Eligibility Criteria (if any)" body={jnf.eligCriteria ? jnf.eligCriteria : ''} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

const JNF_PDF = () => {
  const { id } = useParams();
  const [jnf, setJnf] = React.useState({});
  const [courses, setCourses] = React.useState([]);
  const [coursesLoading, setCoursesLoading] = React.useState(true);

  // Get JNF data from id in query parameter
  React.useEffect(async () => {
    try {
      const { data } = await api.getJNF(id);
      data.branches = data.branches.map((obj) => obj.branch);
      setJnf(data);
    } catch (e) {
      const message = (e.response && e?.response?.data?.message) || 'Unable to fetch data!';
      showToast(ERROR, message);
    }
  }, []);

  // Get Course-wise Branches
  React.useEffect(async () => {
    try {
      let { data } = await api.getCourses();
      data = await Promise.all(
        data.map(async (course) => {
          const { data } = await api.getBranch(course.id);
          course.branches = data;
          return course;
        })
      );
      setCourses(data);
    } catch (e) {
      console.log(e);
      const message = (e.response && e?.response?.data?.message) || 'Unable to fetch branches!';
      showToast(ERROR, message);
    } finally {
      setCoursesLoading(false);
    }
  }, []);

  return (
    <PDFViewer style={styles.pdf}>
      <MyDocument id={id} jnf={jnf} courses={courses} coursesLoading={coursesLoading} />
    </PDFViewer>
  );
};

export default JNF_PDF;
