import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, Form, Button, Card, Badge, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/StudentSearch.css';
import { useStudentData } from './customHooks/useStudent';
import { useStudentContext } from './customHooks/StudentContext';

const alertText = "There are 200 students with overdue payments totaling ₹45,000. Review and send reminders.";

const StudentProfile = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    const stored = localStorage.getItem('recentStudentSearches');
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const { setStudentId } = useStudentContext();

  const navigate = useNavigate();
  const location = useLocation();
  const { cachedStudent, majorInfo, profileDetails } = useStudentData(triggerSearch ? searchTerm : '');
  const { data: studentData, isLoading: isStudentLoading, error: studentError } = cachedStudent;

  // Reset states when navigating to the page
  useEffect(() => {
    if (location.pathname === '/student') {
      setSearchTerm('');
      setSearchResults([]);
      setShowFilter(false);
      setTriggerSearch(false);
      setLoading(false); // Ensure loading is false on page load
      setShowRecentSearches(false);
    }
  }, [location]);

  // Clear search results when search term is empty
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setTriggerSearch(false);
      setLoading(false);
    }
    setStudentId(searchTerm);
  }, [searchTerm]);

  // Update search results and recent searches when student data is fetched
  useEffect(() => {
  if (!isStudentLoading && studentData && !studentError && searchTerm.trim()) {
    console.log('Adding to recent searches:', studentData);
    const newProfile = {
      id: String(studentData.studentId).toLowerCase(),
      name: studentData.studentName,
      parent: studentData.father_name.includes('S/o') || studentData.gender === 'Male'
        ? `S/o ${studentData.father_name}`
        : `D/o ${studentData.father_name}`,
      avatar: studentData.gender === 'Female' ? require('../assets/female.jpg') : require('../assets/male.jpg'), // Relative to src/
      tags: studentData.admission_status === 'Current' ? ['Inter 2', 'Current'] : ['Inter 2'],
    };
    setSearchResults([newProfile]);
    setShowRecentSearches(true);

    setRecentSearches((prev) => {
      const updated = [newProfile, ...prev.filter((p) => p.id.toLowerCase() !== newProfile.id.toLowerCase())].slice(0, 8);
      try {
        localStorage.setItem('recentStudentSearches', JSON.stringify(updated));
        console.log('Saved to localStorage:', updated);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      return updated;
    });
    navigate('/student');
  } else if (studentError) {
    console.log('Student error:', studentError);
    setSearchResults([]);
  }
  setLoading(false);
}, [studentData, isStudentLoading, studentError, searchTerm, navigate]);

  const handleIdSearch = () => {
    setShowRecentSearches(true); // Show recent searches
    setShowFilter(false); // Close filter toggle after clicking search

    if (!searchTerm.trim()) {
      // For empty search, show skeleton animation briefly
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTriggerSearch(false);
        setSearchResults([]);
      }, 500); // Short delay to show skeleton animation
      return;
    }

    // For non-empty search, navigate without skeleton animation
    setSearchResults([]);
    setTriggerSearch(true);
    navigate(`/student`); // Navigate immediately
  };

  // Function to get badge background color based on tag
  const getBadgeColor = (tag) => {
    switch (tag) {
      case 'Inter 2':
        return '#0F6CBD';
      case 'Current':
        return '#4B901F';
      default:
        return '#6c757d'; // Fallback for unexpected tags
    }
  };

  return (
    <main>
      <div className="me-3">
        <section className="student-profile-section d-flex align-items-center">
          <Container fluid>
            <Row className="w-100">
              <Col md={12}>
                <div className="text-start p-2 w-100 me-4 pb-4 pt-3">
                  <h2 className="mb-2" style={{ marginTop: "15px", fontSize: '36px', fontWeight: '700', lineHeight: '40px', letterSpacing: '-0.792px', color: 'rgba(37, 44, 50, 1)', fontFamily: 'Inter, sans-serif'}}>
                    Student Profile
                  </h2>
                  <p className="w-75" style={{ fontSize: '16px', fontWeight: '400', letterSpacing: '-0.096px', color: 'rgba(45, 45, 45, 1)' }}>
                    Access and manage comprehensive student details seamlessly. View personalized profiles tailored to your campus.
                  </p>

                  <div className="position-relative search-filter-wrapper" style={{ width: '36%' }}>
                    <div className="input-group search-input-group w-100">
                      <span className="input-group-text bg-white border-end-0" style={{ cursor: 'pointer', borderColor: '#ced4da' }} onClick={() => setShowFilter(!showFilter)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <path d="M7.79167 13.4583C10.9213 13.4583 13.4583 10.9213 13.4583 7.79167C13.4583 4.66205 10.9213 2.125 7.79167 2.125C4.66205 2.125 2.125 4.66205 2.125 7.79167C2.125 10.9213 4.66205 13.4583 7.79167 13.4583Z" stroke="#0A0A0A" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M14.8747 14.8751L11.8289 11.8292" stroke="#0A0A0A" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search for student profile"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={() => setShowFilter(true)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleIdSearch();
                          }
                        }}
                        style={{
                          outline: 'none',
                          boxShadow: 'none',
                          borderColor: '#ced4da'
                        }}
                      />
                    </div>

                    {showFilter && (
                      <div className="filter-toggle-box shadow" style={{ width: '100%', padding: '1rem' }}>
                        <h6 className="fw-bold mb-3">Filter</h6>
                        <Form.Check className="mb-3" type="checkbox" label="Other Branch">
                          <Form.Check.Input type="checkbox" style={{ borderColor: '#484644' }} />
                          <Form.Check.Label>Other Branch</Form.Check.Label>
                        </Form.Check>

                        <div className="mb-3 d-flex justify-content-between align-items-center">
                          <span className="fw-medium">Location</span>
                          <span className="fs-4 fw-bold">+</span>
                        </div>

                        <div className="mb-3 d-flex justify-content-between align-items-center">
                          <span className="fw-medium">Student Details</span>
                          <span className="fs-4 fw-bold">+</span>
                        </div>

                        <hr />

                        <h6 className="fw-bold mb-4">Student Category</h6>

                        <div className="student-category-grid gap-3">
                          <Form.Check type="checkbox" label="Current Batch" defaultChecked>
                            <Form.Check.Input style={{ borderColor: '#484644' }} type="checkbox" defaultChecked />
                            <Form.Check.Label className="w-5">Current Batch</Form.Check.Label>
                          </Form.Check>

                          <Form.Check type="checkbox" label="Passed Out">
                            <Form.Check.Input style={{ borderColor: '#484644' }} type="checkbox" />
                            <Form.Check.Label className="w-5">Passed Out</Form.Check.Label>
                          </Form.Check>

                          <Form.Check type="checkbox" label="Long Absent">
                            <Form.Check.Input style={{ borderColor: '#484644' }} type="checkbox" />
                            <Form.Check.Label className="w-5">Long Absent</Form.Check.Label>
                          </Form.Check>

                          <Form.Check type="checkbox" label="All">
                            <Form.Check.Input style={{ borderColor: '#484644' }} type="checkbox" />
                            <Form.Check.Label>All</Form.Check.Label>
                          </Form.Check>

                          <Form.Check type="checkbox" label="Drop Out">
                            <Form.Check.Input style={{ borderColor: '#484644' }} type="checkbox" />
                            <Form.Check.Label>Drop Out</Form.Check.Label>
                          </Form.Check>
                        </div>

                        <div className="mt-4 d-flex justify-content-center">
                          <Button className="search-btn" style={{ width: '40%' }} onClick={handleIdSearch}>
                            Search
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {showRecentSearches && (searchResults.length > 0 || recentSearches.length > 0) && (
          <section className="py-2 mt-2 me-3">
            <h5 className="mb-3 fw-bold" style={{ color: '#484848' }}>
              {searchResults.length > 0 ? 'Recent Searches' : 'Search Results'}
            </h5>
            {studentError && (
              <Alert variant="danger">
                Error fetching student data: {studentError.message || 'Something went wrong'}
              </Alert>
            )}
            <Row className="g-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <Col key={idx} xs={6} sm={4} md={3} lg={2}>
                    <div className="skeleton-card animate-pulse">
                      <div className="skeleton skeleton-avatar"></div>
                      <div className="skeleton skeleton-line short"></div>
                      <div className="skeleton skeleton-line"></div>
                      <div className="skeleton-badges">
                        <div className="skeleton skeleton-badge"></div>
                        <div className="skeleton skeleton-badge"></div>
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                (searchResults.length > 0 ? searchResults : recentSearches).slice(0, 6).map((profile) => (
                  <Col key={profile.id} xs={6} sm={4} md={3} lg={2}>
                    <Card className="p-2 text-center shadow-sm" style={{ borderRadius: '0.75rem', border: '1px solid #E2E2E2' }}>
                      <div
                        className="mx-auto mb-2"
                        style={{ width: '6rem', height: '6rem', borderRadius: '50%', overflow: 'hidden', border: '0.375rem solid #FFF', boxShadow: '0 0 0.25rem rgba(0, 0, 0, 0.25)' }}
                      >
                        <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                      </div>
                      <h6 className="mb-2 text-muted">{profile.id}</h6>
                      <h5 className="fw-bold mb-2">{profile.name}</h5>
                      <p className="text-secondary small mb-1">{profile.parent}</p>
                      <svg width="147" height="5" viewBox="0 0 147 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.1334 3.63553L30.2097 3.75007C29.0263 3.59735 27.6901 3.75007 26.4303 3.67371L26.5067 3.71189C23.2999 3.75007 20.3603 3.59735 17.1917 3.521C17.2299 3.521 17.2681 3.55918 17.3063 3.55918C17.1536 3.521 17.0009 3.48282 16.81 3.48282C16.7718 3.521 16.8482 3.521 16.9245 3.521C16.2373 3.67371 14.9775 3.44464 14.5576 3.55918C14.3667 3.55918 14.2904 3.48282 14.4049 3.44464C11.9235 3.40646 9.28933 3.36828 6.76972 3.29192C6.65519 3.3301 6.61702 3.3301 6.65519 3.40646C4.47917 3.1392 2.18862 3.25374 0.0125897 3.29192C-0.063762 3.21556 0.241645 3.21556 0.0125897 3.17738C0.699756 3.06284 1.31057 3.29192 1.95956 3.17738L1.88321 3.1392C2.34132 3.10102 1.95956 3.29192 2.45585 3.21556C2.64673 3.17738 2.41767 3.1392 2.49402 3.1392C3.4866 3.17738 4.51734 3.10102 5.47174 3.25374C5.7008 3.1392 6.54067 3.25374 6.92243 3.1392C7.18966 3.17738 7.41871 3.17738 7.53324 3.25374C10.9691 3.17738 14.5576 3.29192 18.108 3.29192C19.7877 3.521 21.7728 3.25374 23.758 3.3301V3.29192C24.407 3.36828 25.3614 3.36828 26.1249 3.3301L26.7739 3.44464C31.4313 3.25374 36.1652 3.36828 40.8608 3.29192C46.2054 3.21556 50.901 3.06284 56.1311 3.36828C56.1311 3.3301 56.1693 3.3301 56.0166 3.3301C57.5055 3.36828 58.8798 3.29192 60.2923 3.3301V3.29192C62.0484 3.40646 63.8808 3.36828 65.6751 3.36828H66.3623C66.5532 3.36828 66.7822 3.3301 66.9731 3.29192C67.393 3.17738 67.7748 2.94831 68.1184 2.71923C68.8055 2.2229 69.4164 1.57385 70.0272 0.962984C70.7525 0.199399 71.936 -0.182395 73.0431 0.0848603C73.5775 0.199398 74.112 0.504833 74.5319 0.886625C74.9519 1.26842 75.2954 1.68839 75.6772 2.10836C76.059 2.49016 76.4789 2.87195 76.9752 3.1392C77.2042 3.25374 77.4715 3.36828 77.7387 3.44464C78.0059 3.521 78.2732 3.521 78.5404 3.521C79.6475 3.521 80.7546 3.55918 81.8617 3.55918V3.521C85.3739 3.63553 88.7334 3.36828 92.2074 3.44464C95.7959 3.3301 99.5753 3.71189 103.202 3.55918C105.454 3.3301 108.394 3.82643 110.494 3.59735C114.807 3.21556 119.007 3.48282 123.321 3.67371C127.291 3.55918 131.299 3.86461 135.155 3.59735C136.988 3.78825 139.011 3.36828 141.034 3.44464L140.958 3.521C141.683 3.3301 142.6 3.78825 143.058 3.521H142.981C143.363 3.36828 143.898 3.82643 144.127 3.67371L144.203 3.75007C144.661 3.78825 144.241 3.67371 144.623 3.63553C144.776 3.63553 144.661 3.75007 144.966 3.71189C145.043 3.44464 146.112 3.78825 146.15 3.48282C145.883 3.48282 146.532 3.36828 145.959 3.29192C146.112 3.25374 146.913 3.29192 146.837 3.40646C146.913 3.55918 147.219 3.67371 146.723 3.78825L146.646 3.67371C146.493 3.78825 146.532 3.71189 146.455 3.78825C145.844 3.78825 145.73 3.94097 145.31 4.01733C145.005 3.90279 144.585 3.97915 144.356 3.97915L144.279 4.01733C144.127 4.13186 143.554 3.78825 143.745 3.97915C142.485 3.94097 141.034 3.94097 139.622 3.94097C139.431 3.86461 138.553 3.94097 138.858 3.78825C138.515 3.94097 137.446 4.01733 137.064 3.97915C137.064 3.97915 137.102 4.01733 137.14 4.01733C136.377 4.2464 136.224 3.82643 135.537 4.09369C135.422 3.90279 134.239 4.17004 133.857 3.94097C133.666 3.97915 133.666 4.01733 133.666 4.05551C132.368 4.05551 130.956 4.13186 129.887 4.13186C128.971 3.97915 127.635 4.20822 126.871 3.97915C126.222 4.01733 125.153 4.13186 124.237 4.01733L124.313 4.05551C123.283 4.05551 121.985 4.01733 121.259 3.90279C120.954 4.13186 120.496 4.09369 120.038 4.17004C119.35 4.05551 117.938 4.09369 116.907 4.01733C116.754 4.13186 116.029 3.97915 115.991 4.13186C113.013 3.82643 109.348 3.94097 106.18 4.17004H106.218C105.798 4.09369 105.34 3.90279 104.92 3.82643C104.882 3.82643 104.882 3.86461 104.958 3.86461C104.385 3.82643 103.851 3.97915 103.278 3.94097C103.278 3.94097 103.317 3.97915 103.393 3.97915C102.858 3.90279 102.286 4.09369 101.637 3.97915H101.599L101.179 3.94097C101.179 3.97915 101.217 4.05551 101.408 4.05551C96.4449 4.09369 91.3293 3.86461 86.2137 3.90279L86.4046 3.94097L85.412 3.86461C85.412 3.90279 85.4502 3.90279 85.5266 3.90279C84.2668 3.97915 82.9688 3.86461 81.7472 3.86461C81.7472 3.90279 81.938 3.94097 81.7853 3.97915C80.8691 3.86461 80.3347 4.13186 79.8765 3.86461C79.8384 3.86461 79.8002 3.94097 79.9147 3.94097C79.6093 3.94097 79.2657 3.90279 78.9603 3.90279C78.6549 3.90279 78.3495 3.90279 77.9678 3.86461C77.2424 3.75007 76.6698 3.36828 76.1353 2.94831C75.639 2.52833 75.1809 2.032 74.7228 1.57385C74.4938 1.34478 74.3029 1.1157 74.0738 0.962984C73.8448 0.810267 73.5775 0.65755 73.3103 0.581191C72.8904 0.352116 72.3559 0.275757 71.8214 0.390295C71.287 0.466654 70.7907 0.733908 70.4089 1.07752C69.6454 1.84111 68.8819 2.79559 67.8511 3.29192L67.8893 3.3301C67.5457 3.48282 67.2021 3.63553 66.8204 3.67371C66.4386 3.71189 66.095 3.67371 65.7133 3.67371C64.988 3.67371 64.2626 3.67371 63.4991 3.67371C62.0102 3.71189 60.5214 3.75007 59.0325 3.71189C57.8109 3.75007 56.971 3.67371 55.7494 3.67371L55.7112 3.75007C53.6497 3.521 51.3592 3.97915 49.1831 3.71189L49.3358 3.78825C48.9923 3.67371 48.0379 3.82643 48.1524 3.59735L47.7706 3.67371C46.3199 3.36828 45.0983 3.82643 43.304 3.59735L43.4186 3.63553C42.9223 3.59735 42.3878 3.55918 42.0061 3.59735C42.0824 3.59735 42.0442 3.63553 42.1588 3.63553C40.6699 3.86461 38.9902 3.59735 37.425 3.63553L37.6158 3.75007C36.8523 3.63553 35.4398 3.75007 34.4472 3.67371L34.5236 3.71189L34.0273 3.63553V3.71189C32.653 3.75007 31.4313 3.67371 30.1334 3.63553Z" fill="url(#paint0_linear_1342_521)" />
                        <path d="M30.1334 0.53451L30.2097 0.419972C29.0263 0.572689 27.6901 0.419972 26.4303 0.496331L26.5067 0.458151C23.2999 0.419972 20.3603 0.572689 17.1917 0.649048C17.2299 0.649048 17.2681 0.610869 17.3063 0.610869C17.1536 0.649048 17.0009 0.687227 16.81 0.687227C16.7718 0.649048 16.8482 0.649048 16.9245 0.649048C16.2373 0.496331 14.9775 0.725406 14.5576 0.610869C14.3667 0.610869 14.2904 0.687227 14.4049 0.725406C11.9235 0.763586 9.28933 0.801765 6.76972 0.878123C6.65519 0.839944 6.61702 0.839944 6.65519 0.763586C4.47917 1.03084 2.18862 0.916303 0.0125897 0.878123C-0.063762 0.954482 0.241645 0.954482 0.0125897 0.992661C0.699756 1.1072 1.31057 0.878124 1.95956 0.992661L1.88321 1.03084C2.34132 1.06902 1.95956 0.878123 2.45585 0.954482C2.64673 0.992661 2.41767 1.03084 2.49402 1.03084C3.4866 0.992661 4.51734 1.06902 5.47174 0.916303C5.7008 1.03084 6.54067 0.916303 6.92243 1.03084C7.18966 0.992661 7.41871 0.992661 7.53324 0.916303C10.9691 0.992661 14.5576 0.878123 18.108 0.878123C19.7877 0.649048 21.7728 0.916303 23.758 0.839944V0.878123C24.407 0.801765 25.3614 0.801765 26.1249 0.839944L26.7739 0.725406C31.4313 0.916303 36.1652 0.801765 40.8608 0.878123C46.2054 0.954482 50.901 1.1072 56.1311 0.801765C56.1311 0.839944 56.1693 0.839944 56.0166 0.839944C57.5055 0.801765 58.8798 0.878124 60.2923 0.839944V0.878123C62.0484 0.763586 63.8808 0.801765 65.6751 0.801765L66.3623 0.801765C66.5532 0.801765 66.7822 0.839944 66.9731 0.878123C67.393 0.992661 67.7748 1.22174 68.1184 1.45081C68.8055 1.94714 69.4164 2.59619 70.0272 3.20706C70.7525 3.97065 71.936 4.35244 73.0431 4.08518C73.5775 3.97065 74.112 3.66521 74.5319 3.28342C74.9519 2.90163 75.2954 2.48165 75.6772 2.06168C76.059 1.67989 76.4789 1.2981 76.9752 1.03084C77.2042 0.916303 77.4715 0.801765 77.7387 0.725406C78.0059 0.649048 78.2732 0.649048 78.5404 0.649048C79.6475 0.649048 80.7546 0.610869 81.8617 0.610869V0.649048C85.3739 0.53451 88.7334 0.801765 92.2074 0.725406C95.7959 0.839944 99.5753 0.458151 103.202 0.610869C105.454 0.839944 108.394 0.343614 110.494 0.572689C114.807 0.954482 119.007 0.687227 123.321 0.496331C127.291 0.610868 131.299 0.305434 135.155 0.572689C136.988 0.381793 139.011 0.801765 141.034 0.725406L140.958 0.649048C141.683 0.839944 142.6 0.381793 143.058 0.649048H142.981C143.363 0.801765 143.898 0.343613 144.127 0.496331L144.203 0.419972C144.661 0.381793 144.241 0.496331 144.623 0.53451C144.776 0.53451 144.661 0.419972 144.966 0.458151C145.043 0.725406 146.112 0.381793 146.15 0.687227C145.883 0.687227 146.532 0.801765 145.959 0.878123C146.112 0.916303 146.913 0.878124 146.837 0.763586C146.913 0.610869 147.219 0.496331 146.723 0.381793L146.646 0.496331C146.493 0.381793 146.532 0.458151 146.455 0.381793C145.844 0.381793 145.73 0.229076 145.31 0.152717C145.005 0.267255 144.585 0.190896 144.356 0.190896L144.279 0.152717C144.127 0.0381793 143.554 0.381793 143.745 0.190896C142.485 0.229076 141.034 0.229076 139.622 0.229076C139.431 0.305434 138.553 0.229076 138.858 0.381793C138.515 0.229076 137.446 0.152717 137.064 0.190896C137.064 0.190896 137.102 0.152717 137.14 0.152717C136.377 -0.0763585 136.224 0.343613 135.537 0.0763585C135.422 0.267255 134.239 -4.55132e-08 133.857 0.229076C133.666 0.190896 133.666 0.152717 133.666 0.114538C132.368 0.114538 130.956 0.0381792 129.887 0.0381792C128.971 0.190896 127.635 -0.0381793 126.871 0.190896C126.222 0.152717 125.153 0.0381793 124.237 0.152717L124.313 0.114538C123.283 0.114538 121.985 0.152717 121.259 0.267255C120.954 0.0381792 120.496 0.0763586 120.038 0C119.35 0.114538 117.938 0.0763586 116.907 0.152717C116.754 0.0381793 116.029 0.190896 115.991 0.0381792C113.013 0.343614 109.348 0.229076 106.18 0L106.218 0C105.798 0.0763586 105.34 0.267255 104.92 0.343614C104.882 0.343614 104.882 0.305434 104.958 0.305434C104.385 0.343613 103.851 0.190896 103.278 0.229076C103.278 0.229076 103.317 0.190896 103.393 0.190896C102.858 0.267255 102.286 0.0763586 101.637 0.190896L101.599 0.190896L101.179 0.229076C101.179 0.190896 101.217 0.114538 101.408 0.114538C96.4449 0.0763585 91.3293 0.305434 86.2137 0.267255L86.4046 0.229076L85.412 0.305434C85.412 0.267255 85.4502 0.267255 85.5266 0.267255C84.2668 0.190896 82.9688 0.305434 81.7472 0.305434C81.7472 0.267255 81.938 0.229076 81.7853 0.190896C80.8691 0.305434 80.3347 0.0381792 79.8765 0.305434C79.8384 0.305434 79.8002 0.229076 79.9147 0.229076C79.6093 0.229076 79.2657 0.267255 78.9603 0.267255C78.6549 0.267255 78.3495 0.267255 77.9678 0.305434C77.2424 0.419972 76.6698 0.801765 76.1353 1.22174C75.639 1.64171 75.1809 2.13804 74.7228 2.59619C74.4938 2.82527 74.3029 3.05434 74.0738 3.20706C73.8448 3.35978 73.5775 3.51249 73.3103 3.58885C72.8904 3.81793 72.3559 3.89429 71.8214 3.77975C71.287 3.70339 70.7907 3.43614 70.4089 3.09252C69.6454 2.32894 68.8819 1.37445 67.8511 0.878123L67.8893 0.839944C67.5457 0.687227 67.2021 0.53451 66.8204 0.496331C66.4386 0.458151 66.095 0.496331 65.7133 0.496331C64.988 0.496331 64.2626 0.496331 63.4991 0.496331C62.0102 0.458151 60.5214 0.419972 59.0325 0.458151C57.8109 0.419972 56.971 0.496331 55.7494 0.496331L55.7112 0.419972C53.6497 0.649048 51.3592 0.190896 49.1831 0.458151L49.3358 0.381793C48.9923 0.496331 48.0379 0.343614 48.1524 0.572689L47.7706 0.496331C46.3199 0.801765 45.0983 0.343614 43.304 0.572689L43.4186 0.53451C42.9223 0.572689 42.3878 0.610869 42.0061 0.572689C42.0824 0.572689 42.0442 0.53451 42.1588 0.53451C40.6699 0.305434 38.9902 0.572689 37.425 0.53451L37.6158 0.419972C36.8523 0.53451 35.4398 0.419972 34.4472 0.496331L34.5236 0.458151L34.0273 0.53451V0.458151C32.653 0.419972 31.4313 0.496331 30.1334 0.53451Z" fill="url(#paint1_linear_1342_521)" />
                        <defs>
                          <linearGradient id="paint0_linear_1342_521" x1="-2.07601" y1="2.09015" x2="146.967" y2="2.09015" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#0F6CBD" stop-opacity="0" />
                            <stop offset="0.25" stop-color="#0F6CBD" />
                            <stop offset="0.500694" stop-color="#0F6CBD" />
                            <stop offset="0.75" stop-color="#0F6CBD" />
                            <stop offset="1" stop-color="#0F6CBD" stop-opacity="0" />
                          </linearGradient>
                          <linearGradient id="paint1_linear_1342_521" x1="-2.07601" y1="2.07989" x2="146.967" y2="2.07989" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#0F6CBD" stop-opacity="0" />
                            <stop offset="0.25" stop-color="#0F6CBD" />
                            <stop offset="0.500694" stop-color="#0F6CBD" />
                            <stop offset="0.75" stop-color="#0F6CBD" />
                            <stop offset="1" stop-color="#0F6CBD" stop-opacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="text-center mb-2 animate-wave"></div>
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        {profile.tags.map((tag, i) => (
                          <Badge
                            key={`${profile.id}-${tag}-${i}`}
                            style={{ backgroundColor: getBadgeColor(tag), color: '#fff' }}
                            className="px-2 py-2 text-white"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </section>
        )}

        {!showRecentSearches && (
          <section
            className={`alerts-container border rounded mt-2 p-4 bg-white shadow-sm ${showFilter ? 'disabled' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">Alerts</h4>
              <Dropdown>
                <Dropdown.Toggle variant="light" className="border-0 fw-medium text-secondary" style={{ backgroundColor: 'white' }}>
                  Last 7 days
                </Dropdown.Toggle>
              </Dropdown>
            </div>

            <Row>
              {[1, 2, 3].map((item, index) => (
                <Col key={index} md={4} className={`px-3 ${index !== 2 ? 'border-end' : ''}`}>
                  <div className="d-flex flex-column pe-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-exclamation-triangle-fill text-danger fs-5"></i>
                      <h6 className="fw-bold mt-2 fs-6">Pending Student Payments</h6>
                    </div>
                    <p className="mb-0 text-muted alert-text" style={{ width: '350px' }}>
                      {alertText}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </section>
        )}
      </div>
    </main>
  );
};

export default StudentProfile;