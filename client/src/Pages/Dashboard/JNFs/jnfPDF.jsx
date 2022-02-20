import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import ViewJNF from './viewJNF';

// Create Document Component
const MyDocument = () => <ViewJNF />;

const JNF_PDF = () => {
  return (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );
};

export default JNF_PDF;
