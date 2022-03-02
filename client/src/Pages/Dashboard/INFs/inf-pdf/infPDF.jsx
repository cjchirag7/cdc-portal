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
} from '../../JNFs/jnf-pdf/jnfPdfField';
import MiniSpinner from '../../../../components/common/MiniSpinner';
import showToast from '../../../../utils/showToastNotification';
import { ERROR } from '../../../../store/types';
import * as api from '../../../../api';
import { typeOfTest, otherQualificationRounds } from '../../JNFs/data';
import { HeadingInfo, SubHeading } from '../../JNFs/JNFformField';

const MyDocument = ({ inf, courses, coursesLoading }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.PDFHeading}>JOB NOTIFICATION FORM</Text>
          <View>
            <SectionHeading title="Company Overview" />
            <ViewElement title="Name" body={inf.company?.name} />
            <View style={styles.sectionField}>
              <Text style={styles.sectionLeft}>Website: </Text>
              <Link src={inf.company?.website} style={styles.sectionRight}>
                {inf.company?.website}
              </Link>
            </View>
            <ViewElement title="Category" body={inf.company?.category} />
          </View>
          <View>
            <SectionHeading title="Job Details" />
            <ViewElement title="Designation" body={inf.jobDesignation} />
            <ViewElement title="Place of posting" body={inf.postingPlace} />
            <ViewElement title="Job description" body={inf.jobDesc} />
          </View>
          <View>
            <SectionHeading title="Salary Details" />
            <ViewElement title="CTC (in LPA)" body={inf.ctc} />
            <ViewElement title="CTC Breakup" body={inf.ctcBreakup} />
            {inf.bondDetail && <ViewElement title="Bond Details (If any)" body={inf.bondDetail} />}
          </View>
          <View>
            <SectionHeading title="Contact person details" />
            <SectionSubHeading title="Primary Contact" />
            <ViewElement title="Name" body={inf.primaryContact?.name} />
            {inf.primaryContact?.designation && (
              <ViewElement title="Designation" body={inf.primaryContact?.designation} />
            )}
            <ViewElement title="Email Address" body={inf.primaryContact?.email} email />
            {inf.primaryContact?.phone && <ViewElement title="Mobile Number" body={inf.primaryContact?.phone} />}
            <SectionSubHeading title="Secondary Contact (if any)" />
            {inf.secondaryContact?.name && <ViewElement title="Name" body={inf.secondaryContact.name} />}
            {inf.secondaryContact?.designation && (
              <ViewElement title="Designation" body={inf.secondaryContact.designation} />
            )}
            {inf.secondaryContact?.email && (
              <ViewElement title="Email Address" body={inf.secondaryContact.email} email />
            )}
            {inf.secondaryContact?.phone && <ViewElement title="Mobile Number" body={inf.secondaryContact.phone} />}
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
                    eligibleBranch={inf.branches}
                  />
                );
              })}
            {inf.skillsRequired && (
              <View>
                <SubHeading title="Skill Based Hiring" />
                <HeadingInfo title="Students with certified technical expertise in the following skills (from Coursera, Udemy etc.)" />
                {inf.skillsRequired?.map((skill) => (
                  <Text style={styles.sectionRight} key={skill}>
                    {skill}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <View>
            <SectionHeading title="Selection Procedure" />
            <View style={styles.sectionField}>
              <Text style={styles.sectionLeft}>Resume Shortlisting :</Text>
              <View style={styles.sectionRight}>
                <LabeledCheckbox label="Yes" checked={inf.resume} />
                <LabeledCheckbox label="No" checked={!inf.resume} />
              </View>
            </View>
            <View style={styles.sectionField}>
              <Text style={styles.sectionLeft}>Type of test :</Text>
              <View style={styles.sectionRight}>
                {typeOfTest.map((type) => {
                  const checked = inf.testType?.includes(type);
                  return <LabeledCheckbox key={type} label={type} checked={checked} />;
                })}
              </View>
            </View>
            <View style={styles.sectionField}>
              <Text style={styles.sectionLeft}>Total number of rounds :</Text>
              <View style={styles.sectionRight}>
                {otherQualificationRounds.map((type) => {
                  const checked = inf.otherRound?.includes(type);
                  return <LabeledCheckbox key={type} label={type} checked={checked} />;
                })}
              </View>
            </View>
            <ViewElement title="Total number of rounds" body={inf.totalRounds} />
            <ViewElement
              title="Number of offers available for IIT(ISM) students (Range would be sufficient)"
              body={inf.offerRange ? inf.offerRange : ''}
            />
            <ViewElement title="Eligibility Criteria (if any)" body={inf.eligCriteria ? inf.eligCriteria : ''} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

const INF_PDF = () => {
  const { id } = useParams();
  const [inf, setInf] = React.useState({});
  const [courses, setCourses] = React.useState([]);
  const [coursesLoading, setCoursesLoading] = React.useState(true);

  // Get INF data from id in query parameter
  React.useEffect(async () => {
    try {
      const { data } = await api.getINF(id);
      data.branches = data.branches.map((obj) => obj.branch);
      setInf(data);
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
      <MyDocument id={id} inf={inf} courses={courses} coursesLoading={coursesLoading} />
    </PDFViewer>
  );
};

export default INF_PDF;
