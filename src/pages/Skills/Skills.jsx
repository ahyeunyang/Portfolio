import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PageContainer from "../../components/PageContainer/PageContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import SkillsShowcase from "../../components/SkillsShowcase/SkillsShowcase";
import "./Skills.scss";
import "./SkillsMobile.scss";

export default function Skills() {
  return (
    <main id="main-content" className="skills-page" tabIndex={-1}>
      <PageContainer className="skills-page__content">
        <Breadcrumb
          items={[{ label: "홈", href: "/" }, { label: "보유기술" }]}
        />
        <section
          className="skills-page__intro"
          aria-labelledby="skills-page-title"
        >
          <PageTitle
            className="skills-page__title"
            label="보유기술"
            title={
              <>
                디자인에서 구현까지,
                <br />
                경험을 만드는 기술.
              </>
            }
            description={
              <>
                디자인과 웹 퍼블리싱, 프론트엔드까지.
                <br />
                아이디어를 화면으로 구현하는 기술을 소개합니다.
              </>
            }
          />
        </section>
        <SkillsShowcase />
      </PageContainer>
    </main>
  );
}
