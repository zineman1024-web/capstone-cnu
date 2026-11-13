@echo off
chcp 65001 > nul
echo =======================================================================
echo   Seoulmate (서울메이트) - Firebase Hosting 자동 배포 스크립트
echo   목표 도메인: https://cnu-capstone-team4.web.app
echo =======================================================================
echo.

where firebase >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [안내] Firebase CLI(firebase)가 설치되어 있지 않습니다.
    echo.
    echo 1. https://nodejs.org 에서 Node.js LTS 버전을 먼저 설치해주세요.
    echo 2. 설치 후 새 터미널에서 다음 명령어를 실행하여 Firebase 도구를 설치합니다:
    echo    npm install -g firebase-tools
    echo.
    echo 3. 구글 로그인 및 배포:
    echo    firebase login
    echo    firebase deploy --only hosting
    echo.
    pause
    exit /b
)

echo [1/2] Firebase 로그인 상태를 확인합니다...
call firebase login

echo.
echo [2/2] https://cnu-capstone-team4.web.app 으로 배포를 시작합니다...
call firebase deploy --only hosting

echo.
echo =======================================================================
echo  배포 완료! 브라우저에서 https://cnu-capstone-team4.web.app 을 열어 확인하세요.
echo =======================================================================
pause
