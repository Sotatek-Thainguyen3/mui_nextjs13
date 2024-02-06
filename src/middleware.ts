import { i18nConfig } from '@/constants';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({ ...i18nConfig });

export const config = {
    // Match only internationalized pathnames
    // matcher: ['/', '/(vi|en)/:path*']
    // Skip all paths that should not be internationalized
    // Nếu match thì middleware sẽ ko được gọi
    matcher: ["/((?!api|_next|favicon.ico|images.*\\..*).*)"],
};