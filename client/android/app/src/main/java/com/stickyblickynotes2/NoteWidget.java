package com.stickyblickynotes2;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.util.Log;
import android.widget.RemoteViews;
import android.content.SharedPreferences;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class NoteWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        Log.d("where:", "outside try");
        try {
            Log.d("where:", "inside try");
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            Log.d("where:", "SharedPreferences sharedPref = context.getSharedPreferences(\"DATA\", Context.MODE_PRIVATE);");
            String appString = sharedPref.getString("appData", "{\"user\":'no data'}");
            Log.d("where:", "String appString = sharedPref.getString(\"appData\", \"{\\\"user\\\":'no data'}\");");
            JSONObject appData = new JSONObject(appString);
            Log.d("where:", "JSONObject appData = new JSONObject(appString);");
            // Construct the RemoteViews object
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.note_widget);
            Log.d("where:", appData.toString());
            views.setTextViewText(R.id.appwidget_text, appData.getString("user"));
            // Instruct the widget manager to update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}

