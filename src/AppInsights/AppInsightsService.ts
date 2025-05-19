import { ApplicationInsights, ITelemetryItem } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

const reactPlugin = new ReactPlugin();

class AppInsightsHander {
	role: string;
	appName: string;
	user: string;
	appInsights: ApplicationInsights;
	connectionString: string;
	appversion: string;
	projectOraseq?: number;
	constructor(
		role: string,
		appName: string,
		user: string,
		connectionString: string,
		appversion: string,
		projectOraseq?: number
	) {
		this.role = role;
		this.appName = appName;
		this.user = user;
		this.connectionString = connectionString;
		this.appversion = appversion;
		this.projectOraseq = projectOraseq;
		this.appInsights = this.initialize();
	}
	initialize() {
		const appInsights = new ApplicationInsights({
			config: {
				connectionString: this.connectionString,
				extensions: [reactPlugin],
				enableAutoRouteTracking: true,
				disableAjaxTracking: false,
				autoTrackPageVisitTime: true,
				enableCorsCorrelation: true,
				enableRequestHeaderTracking: true,
				enableResponseHeaderTracking: true,
				enableUnhandledPromiseRejectionTracking: true
			}
		});
		appInsights.loadAppInsights();

		appInsights.addTelemetryInitializer((env: ITelemetryItem) => {
			env.tags = env.tags || {};
			env.tags["ai.cloud.role"] = this.role;
			env.data = env.data || {};
			env.data["appId"] = this.appName;
			env.data["username"] = this.user;
			env.data["projectOraseq"] = this.projectOraseq;
			env.data["siteName"] = this.appName;
			env.data["appVersion"] = this.appversion;
		});
		return appInsights;
	}
}
export { reactPlugin, AppInsightsHander };
