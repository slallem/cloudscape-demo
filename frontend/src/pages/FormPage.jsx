import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Textarea from '@cloudscape-design/components/textarea';
import Select from '@cloudscape-design/components/select';
import Checkbox from '@cloudscape-design/components/checkbox';
import RadioGroup from '@cloudscape-design/components/radio-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Alert from '@cloudscape-design/components/alert';

const countryOptions = [
  { label: 'France', value: 'fr' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'Spain', value: 'es' },
  { label: 'Japan', value: 'jp' },
];

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: null,
  bio: '',
  contactMethod: '',
  notifications: 'daily',
  theme: 'system',
  acceptTerms: false,
};

// Field-level validators — return an error message, or '' when valid
const validators = {
  firstName: v => (!v.trim() ? 'First name is required' : v.trim().length < 2 ? 'Must be at least 2 characters' : ''),
  lastName: v => (!v.trim() ? 'Last name is required' : ''),
  email: v =>
    !v.trim()
      ? 'Email is required'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? 'Enter a valid email address'
      : '',
  phone: v => (v && !/^[+]?[\d\s().-]{7,}$/.test(v) ? 'Enter a valid phone number' : ''),
  country: v => (!v ? 'Select a country' : ''),
  bio: v => (v.length > 300 ? 'Bio must be 300 characters or fewer' : ''),
  contactMethod: v => (!v ? 'Select a preferred contact method' : ''),
  acceptTerms: v => (!v ? 'You must accept the terms to continue' : ''),
};

const FormPage = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name, value) => (validators[name] ? validators[name](value) : '');

  const setField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    // Once a field has an error, re-validate live so the message clears as it's fixed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = name => {
    setErrors(prev => ({ ...prev, [name]: validateField(name, form[name]) }));
  };

  const handleSubmit = () => {
    const nextErrors = {};
    Object.keys(validators).forEach(name => {
      const error = validateField(name, form[name]);
      if (error) nextErrors[name] = error;
    });
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  const handleReset = () => {
    setForm(emptyForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <SpaceBetween size="l">
      <Header variant="h1" description="A profile creation form showcasing Cloudscape form fields and validation.">
        Create profile
      </Header>

      {submitted && (
        <Alert type="success" dismissible onDismiss={() => setSubmitted(false)} header="Profile created">
          Welcome, {form.firstName} {form.lastName}. Your profile has been created successfully.
        </Alert>
      )}

      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button formAction="none" onClick={handleReset}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>Create profile</Button>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
          <Container header={<Header variant="h2">Personal information</Header>}>
            <SpaceBetween size="l">
              <ColumnLayout columns={2}>
                <FormField label="First name" errorText={errors.firstName}>
                  <Input
                    value={form.firstName}
                    onChange={({ detail }) => setField('firstName', detail.value)}
                    onBlur={() => handleBlur('firstName')}
                    placeholder="Jane"
                  />
                </FormField>

                <FormField label="Last name" errorText={errors.lastName}>
                  <Input
                    value={form.lastName}
                    onChange={({ detail }) => setField('lastName', detail.value)}
                    onBlur={() => handleBlur('lastName')}
                    placeholder="Doe"
                  />
                </FormField>
              </ColumnLayout>

              <ColumnLayout columns={2}>
                <FormField label="Email" errorText={errors.email}>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={({ detail }) => setField('email', detail.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="jane.doe@example.com"
                  />
                </FormField>

                <FormField label="Phone" description="Optional" errorText={errors.phone}>
                  <Input
                    type="text"
                    inputMode="tel"
                    value={form.phone}
                    onChange={({ detail }) => setField('phone', detail.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="+33 6 12 34 56 78"
                  />
                </FormField>
              </ColumnLayout>

              <FormField label="Country" errorText={errors.country}>
                <Select
                  selectedOption={form.country}
                  onChange={({ detail }) => setField('country', detail.selectedOption)}
                  onBlur={() => handleBlur('country')}
                  options={countryOptions}
                  placeholder="Choose a country"
                  filteringType="auto"
                />
              </FormField>

              <FormField
                label="Bio"
                description="Optional"
                constraintText={`${form.bio.length}/300`}
                errorText={errors.bio}
              >
                <Textarea
                  value={form.bio}
                  onChange={({ detail }) => setField('bio', detail.value)}
                  onBlur={() => handleBlur('bio')}
                  placeholder="Tell us a little about yourself"
                  rows={4}
                />
              </FormField>

              <FormField errorText={errors.acceptTerms}>
                <Checkbox
                  checked={form.acceptTerms}
                  onChange={({ detail }) => setField('acceptTerms', detail.checked)}
                >
                  I accept the terms and conditions
                </Checkbox>
              </FormField>
            </SpaceBetween>
          </Container>

          <Container header={<Header variant="h2">Preferences</Header>}>
            <SpaceBetween size="l">
              <FormField
                label="Preferred contact method"
                description="How should we reach you?"
                errorText={errors.contactMethod}
              >
                <RadioGroup
                  value={form.contactMethod}
                  onChange={({ detail }) => setField('contactMethod', detail.value)}
                  items={[
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone' },
                    { value: 'none', label: 'Do not contact me' },
                  ]}
                />
              </FormField>

              <FormField label="Notification frequency">
                <RadioGroup
                  value={form.notifications}
                  onChange={({ detail }) => setField('notifications', detail.value)}
                  items={[
                    { value: 'realtime', label: 'Real-time', description: 'Get notified as events happen' },
                    { value: 'daily', label: 'Daily digest', description: 'One summary per day' },
                    { value: 'weekly', label: 'Weekly digest', description: 'One summary per week' },
                    { value: 'off', label: 'Off' },
                  ]}
                />
              </FormField>

              <FormField label="Interface theme">
                <RadioGroup
                  value={form.theme}
                  onChange={({ detail }) => setField('theme', detail.value)}
                  items={[
                    { value: 'system', label: 'Match system' },
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                  ]}
                />
              </FormField>
            </SpaceBetween>
          </Container>
          </SpaceBetween>
        </Form>
      </form>
    </SpaceBetween>
  );
};

export default FormPage;
