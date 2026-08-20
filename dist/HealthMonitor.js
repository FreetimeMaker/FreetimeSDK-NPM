"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthMonitor = void 0;
/**
 * Health Monitor for Freetime SDK - Tracks operational health and system status.
 * Ported from Android HealthMonitor v1.1.0
 */
class HealthMonitor {
    constructor() {
        this.isMonitoring = false;
        this.healthData = new Map();
        this.listeners = new Set();
        this.initializeDefaultHealthMetrics();
    }
    initializeDefaultHealthMetrics() {
        this.healthData.set('sdk_status', 'healthy');
        this.healthData.set('last_heartbeat', Date.now());
        this.healthData.set('api_latency', 0);
        this.healthData.set('error_count', 0);
    }
    /**
     * Start passive monitoring of SDK and system health
     */
    startPassiveMonitoring() {
        if (this.isMonitoring)
            return;
        this.isMonitoring = true;
        // Simulate periodic background health checks
        setInterval(() => {
            if (!this.isMonitoring)
                return;
            this.performHealthCheck();
        }, 60000); // Every minute
    }
    /**
     * Stop all monitoring activities
     */
    stopMonitoring() {
        this.isMonitoring = false;
    }
    /**
     * Perform an active health measurement
     */
    async measureCurrentHealth() {
        this.performHealthCheck();
        return this.getHealthReport();
    }
    performHealthCheck() {
        const report = {
            timestamp: Date.now(),
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime(),
            sdkStatus: 'healthy',
            latency: Math.floor(Math.random() * 50) + 10 // Simulated latency
        };
        this.healthData.set('last_report', report);
        this.healthData.set('last_heartbeat', report.timestamp);
        this.notifyListeners(report);
    }
    /**
     * Add a listener for health updates
     */
    addHealthListener(listener) {
        this.listeners.add(listener);
    }
    /**
     * Remove a health listener
     */
    removeHealthListener(listener) {
        this.listeners.delete(listener);
    }
    notifyListeners(data) {
        this.listeners.forEach(listener => listener(data));
    }
    /**
     * Get the latest health report
     */
    getHealthReport() {
        const lastReport = this.healthData.get('last_report') || {};
        return {
            status: this.healthData.get('sdk_status'),
            lastHeartbeat: this.healthData.get('last_heartbeat'),
            metrics: lastReport
        };
    }
    /**
     * Log an SDK error to the health monitor
     */
    logError(error) {
        const count = this.healthData.get('error_count') || 0;
        this.healthData.set('error_count', count + 1);
        this.healthData.set('last_error', error.toString());
        this.healthData.set('sdk_status', 'degraded');
    }
}
exports.HealthMonitor = HealthMonitor;
//# sourceMappingURL=HealthMonitor.js.map