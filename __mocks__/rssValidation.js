export const validationTrueResponse = `<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope
  xmlns:env="http://www.w3.org/2003/05/soap-envelope">
  <env:Body>
    <m:feedvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding"
      xmlns:m="http://www.w3.org/2005/10/feed-validator">
      <m:uri>https://codepen.io/picks/feed/</m:uri>
      <m:checkedby>https://validator.w3.org/feed/check.cgi</m:checkedby>
      <m:date>2020-06-09T19:44:55.370891</m:date>
      <m:validity>true</m:validity>
      <m:errors>
        <m:errorcount>0</m:errorcount>
        <m:errorlist></m:errorlist>
      </m:errors>
      <m:warnings>
        <m:warningcount>1</m:warningcount>
        <m:warninglist>
          <warning>
            <level>warning</level>
            <type>MissingAtomSelfLink</type>
            <line>368</line>
            <column>1</column>
            <text>Missing atom:link with rel=&quot;self&quot;</text>
            <msgcount>1</msgcount>
            <backupcolumn>1</backupcolumn>
            <backupline>368</backupline>
            <element>channel</element>
          </warning>
        </m:warninglist>
      </m:warnings>
      <m:informations>
        <m:infocount>0</m:infocount>
        <m:infolist></m:infolist>
      </m:informations>
    </m:feedvalidationresponse>
  </env:Body>
</env:Envelope>
`;

export const validationFalseResponse = `<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope
  xmlns:env="http://www.w3.org/2003/05/soap-envelope">
  <env:Body>
    <m:feedvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding"
      xmlns:m="http://www.w3.org/2005/10/feed-validator">
      <m:uri>https://web.whatsapp.com/</m:uri>
      <m:checkedby>https://validator.w3.org/feed/check.cgi</m:checkedby>
      <m:date>2020-06-11T19:57:21.484293</m:date>
      <m:validity>false</m:validity>
      <m:errors>
        <m:errorcount>2</m:errorcount>
        <m:errorlist>
          <error>
            <level>error</level>
            <type>UndefinedElement</type>
            <line>1</line>
            <column>247</column>
            <text>Undefined root element: html</text>
            <msgcount>1</msgcount>
            <backupcolumn>247</backupcolumn>
            <backupline>1</backupline>
            <element>html</element>
            <parent>root</parent>
          </error>
          <error>
            <level>error</level>
            <type>SAXError</type>
            <line>1</line>
            <column>1547</column>
            <text>XML parsing error: &lt;unknown&gt;:1:1547: mismatched tag</text>
            <msgcount>1</msgcount>
            <backupcolumn>1461</backupcolumn>
            <backupline>1</backupline>
            <exception>&lt;unknown&gt;:1:1547: mismatched tag</exception>
          </error>
        </m:errorlist>
      </m:errors>
      <m:warnings>
        <m:warningcount>1</m:warningcount>
        <m:warninglist>
          <warning>
            <level>warning</level>
            <type>UnexpectedContentType</type>
            <text>UnexpectedContentType should not be served with the &quot;text/html&quot; media type</text>
            <contentType>text/html</contentType>
          </warning>
        </m:warninglist>
      </m:warnings>
      <m:informations>
        <m:infocount>0</m:infocount>
        <m:infolist></m:infolist>
      </m:informations>
    </m:feedvalidationresponse>
  </env:Body>
</env:Envelope>
`;

export const validationErrorResponse = `<?xml version="1.0"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <soap:Fault>
    <faultcode>feedvalidator.logging.ValidationFailure</faultcode>
    <faultstring><feedvalidator.logging.ValidationFailure instance at 0x7f46db2451b8></faultstring>
    <detail>
    <traceback xmlns="http://www.python.org/doc/current/lib/module-traceback.html">
    Traceback (most recent call last):
    File &quot;/usr/local/feedvalidator/check.cgi&quot;, line 182, in checker_app
        params = feedvalidator.validateURL(url, firstOccurrenceOnly=1, wantRawData=1)
    File &quot;/usr/local/feedvalidator/src/feedvalidator/__init__.py&quot;, line 231, in validateURL
        raise ValidationFailure(logging.HttpError({&apos;status&apos;: x.reason}))
    ValidationFailure: &lt;feedvalidator.logging.ValidationFailure instance at 0x7f46db2451b8&gt;
    </traceback>
    </detail>
    </soap:Fault>
    </soap:Body>
    </soap:Envelope>
`;
