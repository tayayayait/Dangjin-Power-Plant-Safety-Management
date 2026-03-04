# 당진발전본부 안전관리 키오스크 — XML 구조 예시

아래는 `상세서.md`의 전체 UI/UX 구현 명세를 AI가 구조적으로 파싱할 수 있도록 XML 형식으로 변환한 예시입니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<KioskDesignSystem version="1.0" date="2026-03-04" target="32-43inch Touch Kiosk (Offline)">

  <!-- ============================================================ -->
  <!-- 1. 디자인 토큰 (Design Tokens)                                 -->
  <!-- ============================================================ -->
  <DesignTokens>

    <!-- 1-1. 색상 팔레트 -->
    <ColorPalette>
      <Group name="Primary">
        <Color token="--color-primary" hex="#0054A6" usage="메인 CTA 버튼, 활성 탭" rule="안전·신뢰를 나타내는 산업 블루" />
        <Color token="--color-primary-dark" hex="#003D7A" usage="버튼 active/pressed" rule="primary 대비 15% 어둡게" />
        <Color token="--color-primary-light" hex="#E6EFF8" usage="선택된 카드 배경, 뱃지" rule="primary 대비 90% 밝게" />
      </Group>
      <Group name="Secondary">
        <Color token="--color-secondary" hex="#FF6B00" usage="긴급 알림, 경고 아이콘" rule="경고·주의를 나타내는 안전 오렌지" />
        <Color token="--color-secondary-dark" hex="#CC5500" usage="긴급 버튼 active" rule="secondary 대비 15% 어둡게" />
        <Color token="--color-secondary-light" hex="#FFF3E6" usage="경고 배경 배너" rule="secondary 대비 90% 밝게" />
      </Group>
      <Group name="Semantic">
        <Color token="--color-success" hex="#1B8A2F" usage="완료 아이콘·토스트" rule="WCAG AA 대비 >= 4.5:1" />
        <Color token="--color-success-bg" hex="#E8F5E9" usage="성공 배너 배경" />
        <Color token="--color-warning" hex="#E8A500" usage="주의 뱃지·아이콘" rule="텍스트 라벨 병행 필수 (색맹 대응)" />
        <Color token="--color-warning-bg" hex="#FFF8E1" usage="주의 배너 배경" />
        <Color token="--color-danger" hex="#D32F2F" usage="삭제 확인, 에러 메시지" rule="아이콘 + 텍스트 동시 표시" />
        <Color token="--color-danger-bg" hex="#FDECEA" usage="에러 배너 배경" />
        <Color token="--color-info" hex="#0277BD" usage="안내 툴팁·배너" />
        <Color token="--color-info-bg" hex="#E1F5FE" usage="안내 배경" />
      </Group>
      <Group name="Neutral">
        <Color token="--gray-900" hex="#1A1A1A" usage="본문 텍스트" />
        <Color token="--gray-700" hex="#4A4A4A" usage="보조 텍스트" />
        <Color token="--gray-500" hex="#8A8A8A" usage="placeholder, 비활성 텍스트" />
        <Color token="--gray-300" hex="#C4C4C4" usage="구분선 (border)" />
        <Color token="--gray-100" hex="#F0F0F0" usage="섹션 배경, disabled 배경" />
        <Color token="--gray-50" hex="#F8F8F8" usage="페이지 배경" />
        <Color token="--white" hex="#FFFFFF" usage="카드·모달 배경" />
      </Group>
      <Group name="Screensaver">
        <Color token="--screensaver-bg" hex="#0A1628" usage="대기 화면 배경" rule="고대비 다크 톤" />
        <Color token="--screensaver-text" hex="#FFFFFF" usage="슬로건 텍스트" />
        <Color token="--screensaver-accent" hex="#3B82F6" usage="강조 텍스트·진행 바" />
      </Group>
    </ColorPalette>

    <!-- 1-2. 타이포그래피 -->
    <Typography fontFamily="Pretendard" fontSource="local" format="WOFF2" fontDisplay="swap" directory="/assets/fonts/">
      <Rule>최소 본문 크기 20px — 고령자 가독성 기준 (키오스크 거리 0.5~1m)</Rule>
      <Rule>폰트 CDN 사용 금지 (오프라인 환경)</Rule>
      <Style token="--typo-display" fontSize="56px" fontWeight="700" lineHeight="1.2" letterSpacing="-0.5px" usage="대기 화면 슬로건" />
      <Style token="--typo-h1" fontSize="40px" fontWeight="700" lineHeight="1.3" letterSpacing="-0.3px" usage="페이지 제목" />
      <Style token="--typo-h2" fontSize="32px" fontWeight="600" lineHeight="1.35" letterSpacing="-0.2px" usage="섹션 제목" />
      <Style token="--typo-h3" fontSize="26px" fontWeight="600" lineHeight="1.4" letterSpacing="0" usage="카드 제목, 카테고리명" />
      <Style token="--typo-body-lg" fontSize="22px" fontWeight="400" lineHeight="1.6" letterSpacing="0.1px" usage="콘텐츠 본문(확대)" />
      <Style token="--typo-body" fontSize="20px" fontWeight="400" lineHeight="1.6" letterSpacing="0.1px" usage="기본 본문" />
      <Style token="--typo-body-sm" fontSize="18px" fontWeight="400" lineHeight="1.5" letterSpacing="0.1px" usage="보조 텍스트" />
      <Style token="--typo-caption" fontSize="16px" fontWeight="400" lineHeight="1.4" letterSpacing="0.2px" usage="캡션, 타임스탬프" />
      <Style token="--typo-button" fontSize="22px" fontWeight="600" lineHeight="1.0" letterSpacing="0.3px" usage="버튼 라벨" />
    </Typography>

    <!-- 1-3. 간격 -->
    <Spacing system="8px-multiples" exception="4px for micro-adjustments">
      <Rule>아이콘과 텍스트 사이는 8~12px 유지</Rule>
      <Space token="--space-4" value="4px" usage="인라인 아이콘-텍스트 간격" />
      <Space token="--space-8" value="8px" usage="밀접 요소 간격 (뱃지 내부 패딩)" />
      <Space token="--space-12" value="12px" usage="폼 요소 내부 패딩" />
      <Space token="--space-16" value="16px" usage="카드 내부 패딩, 리스트 아이템 간격" />
      <Space token="--space-20" value="20px" usage="버튼 내부 가로 패딩" />
      <Space token="--space-24" value="24px" usage="섹션 간 간격 (소)" />
      <Space token="--space-32" value="32px" usage="카드 간 간격 (그리드 gap)" />
      <Space token="--space-40" value="40px" usage="섹션 간 간격 (중)" />
      <Space token="--space-48" value="48px" usage="페이지 사이드 여백" />
      <Space token="--space-64" value="64px" usage="섹션 간 간격 (대)" />
      <Space token="--space-80" value="80px" usage="상단 헤더 높이" />
    </Spacing>

    <!-- 1-4. 라운딩 -->
    <BorderRadius>
      <Radius token="--radius-sm" value="8px" usage="뱃지, 태그, 입력 필드" />
      <Radius token="--radius-md" value="12px" usage="버튼, 카드" rule="기본 라운딩" />
      <Radius token="--radius-lg" value="16px" usage="모달, 드로어" />
      <Radius token="--radius-xl" value="24px" usage="대기 화면 카드" />
      <Radius token="--radius-full" value="9999px" usage="원형 아이콘 버튼, 아바타" />
    </BorderRadius>

    <!-- 1-5. 그림자 -->
    <Shadows>
      <Shadow token="--shadow-sm" value="0 1px 3px rgba(0,0,0,0.08)" usage="입력 필드" />
      <Shadow token="--shadow-md" value="0 4px 12px rgba(0,0,0,0.10)" usage="카드, 드롭다운" />
      <Shadow token="--shadow-lg" value="0 8px 24px rgba(0,0,0,0.14)" usage="모달, 플로팅 버튼" />
      <Shadow token="--shadow-xl" value="0 16px 48px rgba(0,0,0,0.18)" usage="풀스크린 오버레이" />
      <Shadow token="--shadow-inner" value="inset 0 2px 4px rgba(0,0,0,0.06)" usage="입력 필드 focus 상태" />
    </Shadows>

    <!-- 1-6. 모션 -->
    <Motion>
      <Rule>prefers-reduced-motion: reduce 감지 시 모든 duration 0ms</Rule>
      <Rule>transform 및 opacity만 애니메이션. width/height/top/left 금지</Rule>
      <Duration token="--duration-instant" value="100ms" usage="체크박스 토글" />
      <Duration token="--duration-fast" value="200ms" usage="버튼 hover/active" rule="기본 마이크로 인터랙션" />
      <Duration token="--duration-normal" value="300ms" usage="카드 전환, 탭 전환" />
      <Duration token="--duration-slow" value="500ms" usage="모달 진입/퇴장" />
      <Duration token="--duration-slide" value="600ms" usage="대기 화면 슬라이드 전환" />
      <Easing token="--easing-default" value="cubic-bezier(0.4, 0, 0.2, 1)" usage="대부분의 전환" rule="Material ease" />
      <Easing token="--easing-enter" value="cubic-bezier(0, 0, 0.2, 1)" usage="요소 진입" rule="감속 커브" />
      <Easing token="--easing-exit" value="cubic-bezier(0.4, 0, 1, 1)" usage="요소 퇴장" rule="가속 커브" />
      <Easing token="--easing-spring" value="cubic-bezier(0.34, 1.56, 0.64, 1)" usage="바운스 피드백" rule="터치 피드백 전용" />
    </Motion>

    <!-- 1-7. Z-Index -->
    <ZIndex>
      <Layer token="--z-base" value="0" usage="일반 콘텐츠" />
      <Layer token="--z-card" value="10" usage="카드 hover 상태" />
      <Layer token="--z-sticky" value="20" usage="고정 헤더, 하단 네비게이션" />
      <Layer token="--z-drawer" value="30" usage="사이드 드로어" />
      <Layer token="--z-modal-backdrop" value="40" usage="모달 배경 오버레이" />
      <Layer token="--z-modal" value="50" usage="모달 본체" />
      <Layer token="--z-toast" value="60" usage="토스트 알림" />
      <Layer token="--z-tooltip" value="70" usage="툴팁" />
    </ZIndex>

  </DesignTokens>

  <!-- ============================================================ -->
  <!-- 2. 레이아웃 (Layout)                                           -->
  <!-- ============================================================ -->
  <Layout>

    <Resolution>
      <Standard width="1920" height="1080" label="FHD" scale="1x" rule="모든 레이아웃 기준 해상도" />
      <Alternate width="3840" height="2160" label="4K" scale="2x" rule="43인치 패널 대비" />
      <Minimum width="1366" height="768" label="HD" rule="저가형 패널 폴백" />
      <Orientation value="Landscape" rule="세로 모드 사용 금지" />
      <Scaling method="CSS rem" />
    </Resolution>

    <Grid>
      <Container maxWidth="1760px" sidePadding="48px" paddingToken="--space-48" />
      <MainGrid columns="12" gutter="32px" />
      <MenuGrid columns="4" rows="2" totalSlots="8" rule="카테고리 8개를 4열 2행으로 배치" />
      <MenuCard width="380px" height="400px" gap="32px" gapToken="--space-32" />
    </Grid>

    <Regions>
      <Header height="80px" position="fixed" anchor="top" content="로고 + 현재 시간 + 관리자 버튼" />
      <Content height="calc(100vh - 144px)" overflow="overflow-y: auto; -webkit-overflow-scrolling: touch" />
      <BottomBar height="64px" position="fixed" anchor="bottom" content="홈·뒤로·확대/축소 컨트롤" />
    </Regions>

    <ScrollRules>
      <Rule name="콘텐츠 스크롤">터치 드래그로 자연스러운 관성 스크롤</Rule>
      <Rule name="스크롤바">기본 숨김, 스크롤 중에만 6px 둥근 인디케이터 표시</Rule>
      <Rule name="스크롤 위치 표시">콘텐츠 길이 1.5배 초과 시 우측에 미니맵 스크롤 인디케이터</Rule>
      <Rule name="고정 헤더 그림자">스크롤 시 --shadow-sm 적용</Rule>
      <Rule name="자동 스크롤 복귀">60초 미조작 시 콘텐츠 최상단으로 복귀</Rule>
      <Rule name="멀티터치 줌">지도·도면 뷰어에서만 허용 (pinch-to-zoom)</Rule>
    </ScrollRules>

  </Layout>

  <!-- ============================================================ -->
  <!-- 3. 화면별 레이아웃 상세                                         -->
  <!-- ============================================================ -->
  <Screens>

    <Screen name="Screensaver" id="screensaver">
      <Background color="--screensaver-bg" hex="#0A1628" rule="풀스크린, 상태바 숨김" />
      <SlideTransition interval="5s" animation="crossfade" duration="600ms" token="--duration-slide" />
      <Content source="/content/screensaver/" formats="JPG,PNG" />
      <BottomGuide text="화면을 터치하세요" typography="--typo-h2" color="--screensaver-text" animation="pulse" />
      <EntryCondition idleTimeout="120s" rule="관리자 모드에서 시간(초) 변경 가능" />
      <ExitCondition trigger="anyTouch" exitAnimation="fade-out 300ms" enterAnimation="fade-in 300ms" target="MainScreen" />
    </Screen>

    <Screen name="MainScreen" id="main">
      <Layout type="grid" columns="4" rows="2" />
      <Card width="380px" height="400px" touchTarget="exceeds 44px minimum">
        <Icon size="96x96" format="SVG" color="--color-primary" />
        <Title typography="--typo-h3" />
        <Subtitle typography="--typo-caption" />
      </Card>
      <Header>
        <Left content="로고" />
        <Center content="당진발전본부 안전관리" typography="--typo-h1" />
        <Right content="현재 시각" />
      </Header>
      <BottomBar>
        <Left content="홈 버튼" />
        <Right content="관리자 잠금 아이콘" activation="5초 롱프레스" />
      </BottomBar>
    </Screen>

    <Screen name="ContentViewer" id="viewer">
      <Viewer type="PDF" engine="PDF.js" rule="페이지 단위 스크롤, 상·하 페이지 이동 버튼" />
      <Viewer type="Image" engine="img + pinch-zoom" rule="멀티터치 줌인/줌아웃, 더블탭 → 원본 비율 복귀" formats="JPG,PNG" />
      <Viewer type="Video" engine="HTML5 video" rule="자동 재생 금지, 재생/일시정지/전체화면 컨트롤" formats="MP4" />
      <Viewer type="Map" engine="Canvas panning+zoom" rule="최소 0.5x ~ 최대 3x 줌, 더블탭 → 1x 복귀" />
      <CommonRules>
        <Rule name="뒤로 가기">좌측 상단 화살표 + 하단 바 뒤로 버튼 동시 제공</Rule>
        <Rule name="타이틀">현재 카테고리명 ▸ 문서 제목 (breadcrumb)</Rule>
        <Rule name="타임아웃">60초 미조작 시 확인 모달 표시, 10초 후 자동 메인 복귀</Rule>
      </CommonRules>
    </Screen>

  </Screens>

  <!-- ============================================================ -->
  <!-- 4. 컴포넌트 규격                                               -->
  <!-- ============================================================ -->
  <Components>

    <!-- 4-1. Button -->
    <Component name="Button">
      <Sizes>
        <Size variant="lg" height="64px" paddingX="32px" fontSize="22px" iconSize="28x28" usage="메인 CTA" default="true" />
        <Size variant="md" height="52px" paddingX="24px" fontSize="20px" iconSize="24x24" usage="모달 확인/취소, 툴바" />
        <Size variant="sm" height="40px" paddingX="16px" fontSize="18px" iconSize="20x20" usage="관리자 모드 보조 액션" />
      </Sizes>
      <Styles>
        <Style variant="primary" background="--color-primary" text="#FFFFFF" border="none" usage="메인 CTA" />
        <Style variant="secondary" background="transparent" text="--color-primary" border="2px solid --color-primary" usage="보조 액션" />
        <Style variant="danger" background="--color-danger" text="#FFFFFF" border="none" usage="삭제 확인" />
        <Style variant="ghost" background="transparent" text="--gray-700" border="none" usage="네비게이션, 닫기" />
        <Style variant="icon-only" background="transparent" text="--gray-700" border="none" usage="확대/축소, 재생 컨트롤" />
      </Styles>
      <States>
        <State name="default" change="기본 스타일 적용" />
        <State name="hover" change="배경 밝기 +10%" css="filter: brightness(1.1)" duration="--duration-fast" />
        <State name="active" change="배경 --color-primary-dark, scale(0.97)" duration="--duration-instant" />
        <State name="focus" change="outline: 3px solid #3B82F6; outline-offset: 2px" rule="키보드 네비게이션 대비" />
        <State name="disabled" change="배경 --gray-100, 텍스트 --gray-500, opacity: 0.6" css="pointer-events: none" />
        <State name="loading" change="텍스트 숨김 + 스피너(24px) 중앙 표시" css="pointer-events: none" />
        <State name="error" change="테두리 2px solid --color-danger + 진동 애니메이션(좌우 4px, 300ms)" />
      </States>
      <Rules>
        <Rule>터치 타깃 최소 64 x 44 px 준수</Rule>
        <Rule>아이콘 + 텍스트 조합 시 아이콘-텍스트 간격 8px</Rule>
        <Rule>아이콘 전용 버튼도 aria-label 필수</Rule>
      </Rules>
    </Component>

    <!-- 4-2. Input -->
    <Component name="Input">
      <Properties height="56px" paddingX="16px" fontSize="20px" border="2px solid --gray-300" borderRadius="8px" labelPosition="상단 8px" minWidth="320px" />
      <States>
        <State name="default" change="테두리 --gray-300" />
        <State name="hover" change="테두리 --gray-500" />
        <State name="active" change="focus 상태와 동일 처리" />
        <State name="focus" change="테두리 --color-primary, --shadow-inner, 라벨 color → --color-primary" />
        <State name="disabled" change="배경 --gray-100, 테두리 --gray-300, opacity 0.6" />
        <State name="loading" change="우측에 스피너 아이콘 표시" rule="비동기 유효성 검사용" />
        <State name="error" change="테두리 --color-danger, 하단 에러 메시지(16px)" rule="라벨도 --color-danger로 변경" />
      </States>
      <Rules>
        <Rule>관리자 모드에서만 사용 (일반 사용자에게 텍스트 입력 없음)</Rule>
        <Rule>가상 키보드는 OS 기본 IME 사용</Rule>
        <Rule>패스워드 입력 시 마스킹(●) + 보이기/숨기기 토글</Rule>
      </Rules>
    </Component>

    <!-- 4-3. Textarea -->
    <Component name="Textarea">
      <Properties minHeight="120px" maxHeight="300px" padding="16px" fontSize="20px" resize="none" />
      <States ref="Input" note="상태는 Input과 동일" />
    </Component>

    <!-- 4-4. Card -->
    <Component name="Card" subtype="카테고리 메뉴 카드">
      <Properties width="380px" height="400px" padding="32px" background="--white" border="1px solid --gray-300" borderRadius="12px" shadow="--shadow-md" align="flexbox center center" />
      <Icon size="96x96" format="SVG" color="--color-primary" />
      <Title typography="--typo-h3" marginTop="16px" />
      <Subtitle typography="--typo-caption" marginTop="8px" color="--gray-500" />
      <States>
        <State name="default" change="기본 스타일" />
        <State name="hover" change="그림자 → --shadow-lg, 테두리 → --color-primary, translateY(-4px)" duration="--duration-normal" />
        <State name="active" change="scale(0.98), 배경 → --color-primary-light" duration="--duration-instant" />
        <State name="focus" change="outline: 3px solid #3B82F6; outline-offset: 4px" />
        <State name="disabled" change="opacity 0.4, pointer-events: none" rule="콘텐츠 미등록 카테고리" />
        <State name="loading" change="내부 요소 숨김 + 스켈레톤(shimmer) 표시" />
        <State name="error" change="아이콘 → --color-danger, 부제 → '콘텐츠를 불러올 수 없습니다'" />
      </States>
      <Rules>
        <Rule>cursor: pointer 필수</Rule>
        <Rule>카드 전체가 터치 영역 (카드 내부 별도 버튼 금지)</Rule>
        <Rule>role="button" + tabindex="0" 적용</Rule>
      </Rules>
    </Component>

    <!-- 4-5. Modal -->
    <Component name="Modal">
      <Properties maxWidth="640px" minWidth="480px" padding="40px" background="--white" borderRadius="16px" shadow="--shadow-xl" overlay="rgba(0,0,0,0.5)" overlayZ="--z-modal-backdrop" modalZ="--z-modal" />
      <Animation enter="opacity 0→1 + scale(0.95→1)" enterDuration="--duration-slow" enterEasing="--easing-enter" exit="opacity 1→0 + scale(1→0.95)" exitDuration="--duration-normal" exitEasing="--easing-exit" />
      <States>
        <State name="default" change="표시 상태" />
        <State name="hover" change="없음" />
        <State name="active" change="없음" />
        <State name="focus" change="모달 내부로 포커스 트랩" rule="Tab 키로 모달 밖 이동 불가" />
        <State name="disabled" change="없음" />
        <State name="loading" change="확인 버튼 disabled + 스피너" />
        <State name="error" change="상단에 --color-danger-bg 배경 에러 배너" />
      </States>
      <Rules>
        <Rule>오버레이 터치 시 모달 닫힘 (위험 모달은 예외)</Rule>
        <Rule>ESC 키 닫힘 지원</Rule>
        <Rule>포커스 트랩: 열림 시 첫 번째 포커스 가능 요소로 이동</Rule>
        <Rule>비활성 영역 aria-hidden="true"</Rule>
      </Rules>
    </Component>

    <!-- 4-6. Drawer -->
    <Component name="Drawer">
      <Properties width="480px" height="100vh" background="--white" shadow="--shadow-xl" zIndex="--z-drawer" overlay="rgba(0,0,0,0.3)" direction="right" />
      <Animation enter="translateX(100% → 0)" enterDuration="--duration-slow" enterEasing="--easing-enter" exit="translateX(0 → 100%)" exitDuration="--duration-normal" exitEasing="--easing-exit" />
      <States>
        <State name="default" change="열린 상태" />
        <State name="focus" change="포커스 트랩" />
        <State name="loading" change="내부 콘텐츠 → 스켈레톤" />
        <State name="error" change="내부 에러 배너" />
      </States>
      <Rules>
        <Rule>관리자 모드에서 카테고리별 콘텐츠 관리 시 사용</Rule>
        <Rule>스와이프 우→좌로 닫기 제스처 지원</Rule>
        <Rule>오버레이 터치 시 닫힘</Rule>
      </Rules>
    </Component>

    <!-- 4-7. Toast -->
    <Component name="Toast">
      <Properties position="화면 하단 중앙, bottom 100px" maxWidth="560px" minHeight="56px" padding="16px 20px" borderRadius="12px" shadow="--shadow-lg" zIndex="--z-toast" autoDismiss="4s" fontSize="--typo-body-sm" />
      <Animation enter="translateY(20px→0) + opacity 0→1" enterDuration="--duration-normal" exit="translateY(0→20px) + opacity 1→0" exitDuration="--duration-fast" />
      <Types>
        <Type name="success" background="--color-success-bg" icon="check" textColor="--gray-900" />
        <Type name="warning" background="--color-warning-bg" icon="warning-triangle" textColor="--gray-900" />
        <Type name="error" background="--color-danger-bg" icon="error-circle" textColor="--gray-900" />
        <Type name="info" background="--color-info-bg" icon="info-circle" textColor="--gray-900" />
      </Types>
      <States>
        <State name="default" change="표시 상태" />
        <State name="hover" change="밝기 +5%" rule="자동 소멸 타이머 일시정지" />
      </States>
      <Rules>
        <Rule>최대 동시 표시 3개, 위로 스택</Rule>
        <Rule>닫기(✕) 버튼 우측 배치</Rule>
      </Rules>
    </Component>

    <!-- 4-8. Table -->
    <Component name="Table" scope="관리자 모드 전용">
      <Properties headerHeight="52px" rowHeight="60px" cellPaddingX="20px" headerBg="--gray-100" headerText="--typo-body-sm --gray-700 SemiBold" evenRowBg="--white" oddRowBg="--gray-50" rowBorder="1px solid --gray-300" maxRows="10" pagination="true" />
      <States>
        <State name="default" change="기본 스타일" />
        <State name="hover" change="행 배경 → --color-primary-light" duration="--duration-fast" />
        <State name="active" change="행 배경 → --color-primary-light, 좌측 4px solid --color-primary" />
        <State name="focus" change="outline: 2px solid #3B82F6 (행 단위)" />
        <State name="disabled" change="텍스트 --gray-500, 액션 버튼 숨김" />
        <State name="loading" change="행 전체 스켈레톤(shimmer)" />
        <State name="error" change="행 배경 --color-danger-bg + 에러 아이콘" />
      </States>
      <Rules>
        <Rule>열 정렬: 텍스트 좌정렬, 숫자 우정렬, 액션 중앙 정렬</Rule>
        <Rule>정렬(sort): 헤더 클릭 시 오름차순/내림차순 토글</Rule>
        <Rule>빈 상태: 테이블 중앙에 "등록된 콘텐츠가 없습니다" + 등록 버튼</Rule>
      </Rules>
    </Component>

  </Components>

  <!-- ============================================================ -->
  <!-- 5. 관리자 모드 (Admin Mode)                                     -->
  <!-- ============================================================ -->
  <AdminMode>

    <EntryFlow>
      <Step order="1" action="메인 화면 우측 하단 관리자 아이콘 5초 롱프레스" feedback="아이콘에 원형 프로그레스 표시" />
      <Step order="2" action="패스워드 입력 모달 표시" input="숫자 6자리 PIN (가상 넘버패드)" />
      <Step order="3" action="인증 성공 시 관리자 대시보드 진입" failMessage="잘못된 비밀번호입니다" failFeedback="toast" maxAttempts="5" />
      <Step order="4" action="5회 연속 실패 시 잠금" lockDuration="300s" feedback="잠금 해제 까지 남은 시간 표시" />
    </EntryFlow>

    <Dashboard>
      <Sidebar width="240px">
        <MenuItem>카테고리 1~8</MenuItem>
        <MenuItem>USB 관리</MenuItem>
        <MenuItem>시스템 설정</MenuItem>
      </Sidebar>
      <ContentArea content="테이블 / 파일 업로드 / 미리보기" />
    </Dashboard>

    <USBUpdateFlow>
      <Step order="1" action="USB 삽입 감지" feedback="토스트: USB 장치 감지됨" />
      <Step order="2" action="파일 탐색" target="USB 내 /kiosk-content/ 폴더 자동 탐색" />
      <Step order="3" action="파일 미리보기" display="파일 목록 + 썸네일 표시" />
      <Step order="4" action="카테고리 선택" input="각 파일에 대상 카테고리 드롭다운" />
      <Step order="5" action="복사 실행" feedback="프로그레스 바 + 복사 완료 토스트" />
      <Step order="6" action="확인" feedback="등록된 콘텐츠 즉시 미리보기" />
    </USBUpdateFlow>

  </AdminMode>

  <!-- ============================================================ -->
  <!-- 6. 상호작용 패턴                                               -->
  <!-- ============================================================ -->
  <InteractionPatterns>

    <TouchGestures>
      <Gesture name="탭 (Tap)" action="항목 선택, 버튼 실행" scope="전체" />
      <Gesture name="롱프레스 (5초)" action="관리자 모드 진입" scope="관리자 아이콘" />
      <Gesture name="스와이프 좌/우" action="슬라이드 전환, 목록 넘기기" scope="대기 화면, 이미지 갤러리" />
      <Gesture name="핀치 줌 인/아웃" action="확대/축소" scope="지도, 도면, 이미지 뷰어" />
      <Gesture name="더블 탭" action="원본 크기 복귀" scope="지도, 이미지 뷰어" />
      <Gesture name="스와이프 우→좌" action="드로어 닫기" scope="관리자 드로어" />
    </TouchGestures>

    <FeedbackRules>
      <Feedback name="터치 피드백" rule="터치 포인트에 반투명 원형 리플(ripple) 효과, 반경 40px, 300ms" />
      <Feedback name="화면 전환" rule="crossfade 300ms (콘텐츠 간)" />
      <Feedback name="깊은 전환" rule="좌→우 sliding (드릴다운), 우→좌 sliding (뒤로)" />
      <Feedback name="로딩" rule="0.5초 이내: 없음 / 0.5~2초: 스피너 / 2초 초과: 스켈레톤 UI" />
      <Feedback name="에러" rule="에러 모달 + 토스트 동시 표시 금지. 맥락에 맞는 하나만 선택" />
    </FeedbackRules>

    <TimeoutPolicy>
      <Timeout name="대기 화면 전환" idle="120s" action="현 화면 → 대기 화면" />
      <Timeout name="콘텐츠 뷰어 타임아웃" idle="60s" action="확인 모달 → 10초 후 메인 복귀" />
      <Timeout name="관리자 세션 만료" idle="300s" action="자동 로그아웃 → 메인 화면" />
    </TimeoutPolicy>

  </InteractionPatterns>

  <!-- ============================================================ -->
  <!-- 7. 아이콘 & 에셋 규칙                                          -->
  <!-- ============================================================ -->
  <IconAndAssetRules>
    <Rule name="아이콘 라이브러리">Lucide Icons (SVG, 로컬 번들링)</Rule>
    <IconSizes>
      <Size value="20px" usage="인라인" />
      <Size value="24px" usage="버튼 내" />
      <Size value="28px" usage="내비게이션" />
      <Size value="96px" usage="카테고리 카드" />
    </IconSizes>
    <Rule name="아이콘 색상">currentColor 상속. 특정 색상 필요 시 토큰 사용</Rule>
    <Rule name="이미지 포맷">WebP 우선, JPG/PNG 폴백</Rule>
    <Rule name="이미지 비율">스크린세이버: 16:9, 카드 썸네일: 4:3</Rule>
    <Rule name="커스텀 아이콘">viewBox="0 0 24 24", 2px stroke, round linecap</Rule>
    <Rule name="이모지">UI 아이콘으로 이모지 사용 금지</Rule>
  </IconAndAssetRules>

  <!-- ============================================================ -->
  <!-- 8. 접근성 (A11y) 체크리스트                                     -->
  <!-- ============================================================ -->
  <Accessibility>
    <Check id="A1" item="명도 대비" criteria="텍스트:배경 >= 4.5:1 (본문), >= 3:1 (대형 텍스트 24px↑)" method="WebAIM Contrast Checker" />
    <Check id="A2" item="터치 타깃 크기" criteria="최소 44x44px (권장 64x64px)" method="레이아웃 검수" />
    <Check id="A3" item="포커스 표시" criteria="모든 인터랙티브 요소에 3px outline" method="Tab 키 네비게이션 테스트" />
    <Check id="A4" item="aria-label" criteria="아이콘 전용 버튼에 한국어 라벨" method="코드 리뷰" />
    <Check id="A5" item="시맨틱 HTML" criteria="nav, main, section, article 적용" method="코드 리뷰" />
    <Check id="A6" item="heading 계층" criteria="페이지당 h1 1개, 순서 건너뛰기 금지" method="자동 린트" />
    <Check id="A7" item="색상만으로 정보 전달 금지" criteria="에러: 붉은 테두리 + 텍스트 + 아이콘 동시 사용" method="그레이스케일 테스트" />
    <Check id="A8" item="모션 감소" criteria="prefers-reduced-motion 시 애니메이션 비활성화" method="OS 설정 변경 테스트" />
    <Check id="A9" item="이미지 alt 텍스트" criteria="모든 img에 한국어 설명 alt 속성" method="코드 리뷰" />
    <Check id="A10" item="영상 자막" criteria="MP4 파일에 .vtt 자막 파일 제공 (선택)" method="콘텐츠 등록 시 가이드" />
  </Accessibility>

  <!-- ============================================================ -->
  <!-- 9. UI QA 체크리스트                                             -->
  <!-- ============================================================ -->
  <QAChecklist>

    <Category name="시각 품질">
      <Check id="Q1" item="폰트 렌더링" criteria="Pretendard 로컬 폰트 정상 로드, 폴백 없음" />
      <Check id="Q2" item="아이콘 일관성" criteria="모든 아이콘 Lucide 통일, 크기·선 굵기 동일" />
      <Check id="Q3" item="컬러 일치" criteria="스크린 캡처 기준 토큰 HEX 값 ±1 이내" />
      <Check id="Q4" item="그림자·반경" criteria="디자인 토큰 값과 완전 일치" />
      <Check id="Q5" item="이미지 깨짐" criteria="모든 에셋 정상 표시, 깨진 이미지 아이콘 없음" />
    </Category>

    <Category name="인터랙션">
      <Check id="Q6" item="터치 반응" criteria="탭 후 100ms 이내 시각 피드백" />
      <Check id="Q7" item="스크롤 부드러움" criteria="60fps 유지, 끊김 없음" />
      <Check id="Q8" item="화면 전환" criteria="모든 전환 300ms 이내 완료" />
      <Check id="Q9" item="핀치 줌" criteria="두 손가락 줌 인/아웃 동작 원활" />
      <Check id="Q10" item="타임아웃 정확성" criteria="대기 화면(120초), 뷰어(60초) 오차 ±2초" />
    </Category>

    <Category name="콘텐츠 뷰어">
      <Check id="Q11" item="PDF 렌더링" criteria="10페이지 이상 PDF 정상 로드, 페이지 이동 동작" />
      <Check id="Q12" item="이미지 표시" criteria="JPG/PNG 최대 10MB 파일 정상 로드" />
      <Check id="Q13" item="동영상 재생" criteria="MP4(H.264) 최대 500MB 재생, 컨트롤 바 동작" />
      <Check id="Q14" item="지도 줌" criteria="0.5x ~ 3x 범위 내 줌, 초과 시 바운스 복귀" />
    </Category>

    <Category name="관리자 모드">
      <Check id="Q15" item="로그인 보안" criteria="5회 실패 시 300초 잠금 동작" />
      <Check id="Q16" item="USB 인식" criteria="USB 삽입 5초 이내 감지 및 알림" />
      <Check id="Q17" item="파일 복사" criteria="100MB 파일 복사 시 프로그레스 바 정상 표시" />
      <Check id="Q18" item="CRUD" criteria="콘텐츠 등록/수정/삭제 후 즉시 반영" />
      <Check id="Q19" item="세션 만료" criteria="300초 미조작 시 자동 로그아웃" />
    </Category>

    <Category name="시스템">
      <Check id="Q20" item="오프라인 동작" criteria="네트워크 미연결 상태에서 모든 기능 정상" />
      <Check id="Q21" item="부팅 자동 시작" criteria="OS 부팅 시 키오스크 앱 자동 실행" />
      <Check id="Q22" item="크래시 복구" criteria="앱 비정상 종료 시 5초 내 자동 재시작" />
      <Check id="Q23" item="해상도 대응" criteria="FHD(1920x1080) 및 4K(3840x2160) 정상 렌더링" />
      <Check id="Q24" item="메모리 누수" criteria="24시간 연속 가동 시 메모리 사용량 증가 <= 5%" />
    </Category>

  </QAChecklist>

  <!-- ============================================================ -->
  <!-- 10. 파일 디렉터리 구조                                          -->
  <!-- ============================================================ -->
  <DirectoryStructure>
    <Directory name="kiosk-app">
      <Directory name="assets">
        <Directory name="fonts" description="Pretendard WOFF2" />
        <Directory name="icons" description="Lucide SVG 번들" />
        <Directory name="images" description="UI 에셋 (로고 등)" />
      </Directory>
      <Directory name="content">
        <Directory name="screensaver" description="대기 화면 이미지/비디오" />
        <Directory name="category-01" description="본부 지도 콘텐츠" />
        <Directory name="category-02" description="안전관리 수칙" />
        <Directory name="category-03" description="보건관리 정보" />
        <Directory name="category-04" description="사고 사례 전파" />
        <Directory name="category-05" description="비상시 대응 조치" />
        <Directory name="category-06" description="긴급 위험 신고 안내" />
        <Directory name="category-07" description="[협의 후 확정]" />
        <Directory name="category-08" description="[협의 후 확정]" />
      </Directory>
      <Directory name="src">
        <Directory name="components" description="재사용 컴포넌트" />
        <Directory name="screens" description="화면별 모듈" />
        <Directory name="styles" description="디자인 토큰 CSS" />
        <Directory name="utils" description="유틸리티 (USB, 파일 I/O)" />
        <Directory name="admin" description="관리자 모드 모듈" />
      </Directory>
      <Directory name="config">
        <File name="settings.json" description="타임아웃, PIN, 카테고리 설정" />
      </Directory>
    </Directory>
  </DirectoryStructure>

  <!-- ============================================================ -->
  <!-- 가정 (Assumptions)                                             -->
  <!-- ============================================================ -->
  <Assumptions>
    <Assumption id="A1" item="기준 해상도" value="FHD 1920x1080" rationale="32~43인치 키오스크 표준 해상도" />
    <Assumption id="A2" item="기본 폰트" value="Pretendard" rationale="한국어 가독성 우수, 오픈소스, 오프라인 번들링 가능" />
    <Assumption id="A3" item="최소 본문 크기" value="20px" rationale="키오스크 관찰 거리 0.5~1m, 고령자 가독성" />
    <Assumption id="A4" item="메뉴 카드 크기" value="380x400px" rationale="FHD에서 4열 2행 배치 시 충분한 터치 영역 확보" />
    <Assumption id="A5" item="대기 화면 전환 시간" value="120초" rationale="일반 키오스크 표준 (60~180초 범위)" />
    <Assumption id="A6" item="관리자 PIN 길이" value="6자리 숫자" rationale="보안성과 편의성 균형" />
    <Assumption id="A7" item="관리자 잠금 시간" value="300초 (5분)" rationale="무차별 대입 방지, 현장 운영 고려" />
    <Assumption id="A8" item="동영상 최대 용량" value="500MB" rationale="로컬 저장소 기반, 10분 내외 안전 교육 영상" />
    <Assumption id="A9" item="OS 환경" value="Windows 10/11 IoT Enterprise 또는 Linux(Ubuntu)" rationale="키오스크 모드 지원, 장기 보안 업데이트" />
    <Assumption id="A10" item="개발 프레임워크" value="Electron 또는 NW.js" rationale="웹 기술 기반, 오프라인 환경, USB 접근 API 지원" />
    <Assumption id="A11" item="카테고리 수" value="8개 고정" rationale="과업 범위 명시 기준, 추후 확장 시 스크롤 그리드 전환" />
    <Assumption id="A12" item="색상 체계" value="라이트 모드 전용" rationale="키오스크 환경에서 명시성·가독성 우선 (대기 화면만 다크)" />
  </Assumptions>

</KioskDesignSystem>
```
