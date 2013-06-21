##############STOPLMTTRIGGER###############
# WGRIFFITH2 (C) 2013

INPUT SIDE = "LONG";
INPUT PERIODS = 3; # LAST NUMBER OF CANDLESTICKS
INPUT OVER_BOUGHT = 35;
INPUT AVGVOL = 50;

DEF KPERIOD = 14;
DEF DPERIOD = 3;

# STOCHASTIC SLOW CALCULATION
DEF FASTLINE = ROUND(SIMPLEMOVINGAVG(100*((CLOSE-LOWEST(LOW,KPERIOD))/(HIGHEST(HIGH,KPERIOD)-LOWEST(LOW,KPERIOD))), LENGTH = DPERIOD));
DEF SLOWLINE = ROUND(SIMPLEMOVINGAVG(SIMPLEMOVINGAVG(100*((CLOSE-LOWEST(LOW,KPERIOD))/(HIGHEST(HIGH,KPERIOD)-LOWEST(LOW,KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

DEF NEW_PERIOD = PERIODS - 1;
DEF BUYSIGNAL = VOLUMEAVG(LENGTH = AVGVOL) > VOLUMEAVG(LENGTH = AVGVOL).VOLAVG AND SLOWLINE <= OVER_BOUGHT AND FASTLINE > FASTLINE[1] AND CLOSE>CLOSE[1];
DEF ENTRY = BUYSIGNAL IS TRUE;
DEF ROLLINGLOW = LOWEST(DATA = LOW(), LENGTH = PERIODS)[1];
DEF STOPLOSS = (LOW <= ROLLINGLOW AND SLOWLINE>FASTLINE AND ENTRY IS FALSE);

PLOT ABOVE = ENTRY;
PLOT BELOW = STOPLOSS;

BELOW.SETDEFAULTCOLOR(COLOR.DOWNTICK);
BELOW.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_DOWN);
ABOVE.SETDEFAULTCOLOR(COLOR.UPTICK);
ABOVE.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_UP);

#########################################